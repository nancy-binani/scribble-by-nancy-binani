import React, { useState, useEffect } from "react";

import { Delete, Edit, Reorder, Plus } from "neetoicons";
import { PageLoader, Typography } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import DeleteAlert from "./DeleteAlert";

import { CATEGORY_INITIAL_VALUE } from "../../Articles/constants";
import CreateCategory from "../../Articles/CreateCategory";

const ManageCategories = () => {
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState(CATEGORY_INITIAL_VALUE);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletedCategory, setDeletedCategory] = useState([]);
  const [categoriesUpdated, setCategoriesUpdated] = useState(false);

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
    setCategoriesUpdated(false);
  };

  const handleCreateCategory = () => {
    setIsEdit(false);
    setCategoryValue(CATEGORY_INITIAL_VALUE);
    setCreateNewCategory(!createNewCategory);
  };
  const handleEditCategory = (category, id) => {
    setCategoriesUpdated(true);
    setIsEdit(true);
    setCategoryValue({ category, id });
    setCreateNewCategory(!createNewCategory);
  };
  const handleDeleteCategory = category => {
    setShowDeleteAlert(true);
    setDeletedCategory(category);
  };
  const handleUpdateWithPosition = async (position, id) => {
    try {
      await categoriesApi.updateWithPosition(position, id);
      setCategoriesUpdated(true);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleOnDragEnd = result => {
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
    handleUpdateWithPosition(result.destination.index + 1, reorderedItem.id);
  };

  useEffect(() => {
    fetchCategories();
  }, [categoriesUpdated, createNewCategory]);

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
                          onClick={() => handleDeleteCategory(category)}
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
      {showDeleteAlert && (
        <DeleteAlert
          categories={categories}
          deletedCategory={deletedCategory}
          setCategoriesUpdated={setCategoriesUpdated}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
};

export default ManageCategories;
