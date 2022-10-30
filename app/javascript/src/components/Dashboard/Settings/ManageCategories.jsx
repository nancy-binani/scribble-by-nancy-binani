import React, { useState, useEffect } from "react";

import { Delete, Edit, Reorder, Plus } from "neetoicons";
import { PageLoader, Toastr, Typography } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import { CATEGORY_INITIAL_VALUE } from "../Articles/constants";
import CreateCategory from "../Articles/CreateCategory";

const ManageCategories = () => {
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState(CATEGORY_INITIAL_VALUE);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setIsEdit(false);
    setCategoryValue(CATEGORY_INITIAL_VALUE);
    setCreateNewCategory(!createNewCategory);
  };
  const handleEditCategory = (category, id) => {
    setIsEdit(true);
    setCategoryValue({ category, id });
    setCreateNewCategory(!createNewCategory);
  };
  const handleDeleteCategory = async id => {
    try {
      await categoriesApi.destroy(id);
      await fetchCategories();
      Toastr.success("Category is deleted successfully.");
    } catch (error) {
      logger.error(error);
    }
  };
  const handleUpdateWithPosition = async (positions, reorderedItem) => {
    try {
      await categoriesApi.updateWithPosition(positions, reorderedItem.id);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleOnDragEnd = result => {
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const positions = items.map(({ id }) => id);
    setCategories(items);
    handleUpdateWithPosition(positions, reorderedItem);
  };

  useEffect(() => {
    fetchCategories();
  }, [createNewCategory]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto my-6">
      <Typography style="h2">Manage Categories</Typography>
      <Typography className="text-gray-600" style="body1">
        Create and configure the categories inside your scribble.
      </Typography>
      <div className="my-6 flex text-indigo-500" onClick={handleCreateCategory}>
        <Plus size={20} />
        <Typography className="ml-1" style="h4">
          Add New Category
        </Typography>
      </div>
      {createNewCategory && (
        <CreateCategory
          categories={categories}
          category={categoryValue}
          createNewCategory={createNewCategory}
          fetchCategories={fetchCategories}
          isEdit={isEdit}
          setCreateNewCategory={setCreateNewCategory}
        />
      )}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, index) => (
                <Draggable
                  draggableId={String(category["id"])}
                  index={index}
                  key={category["id"]}
                >
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border-b my-6 flex justify-between border-solid pb-3 tracking-tight"
                      ref={provided.innerRef}
                    >
                      <div className="flex">
                        <Reorder color="gray" size={20} />
                        <Typography className="ml-3" style="h4">
                          {category["category"]}
                        </Typography>
                      </div>
                      <div className="flex">
                        <Edit
                          className="ml-3"
                          color="gray"
                          size={20}
                          onClick={() =>
                            handleEditCategory(
                              category["category"],
                              category["id"]
                            )
                          }
                        />
                        <Delete
                          color="gray"
                          size={20}
                          onClick={() =>
                            handleDeleteCategory(category["id"], index)
                          }
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ManageCategories;
