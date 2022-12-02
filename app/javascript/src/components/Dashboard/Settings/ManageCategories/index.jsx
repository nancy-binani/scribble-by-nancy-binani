import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Typography, Dropdown, PageLoader, Button, Input } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import Articles from "./Articles";
import Banner from "./Banner";
import Category from "./Category";
import DeleteAlert from "./DeleteAlert";
import Form from "./Form";

import { CATEGORY_INITIAL_VALUE } from "../../Articles/constants";

const { Menu, MenuItem } = Dropdown;

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [showPane, setShowPane] = useState(false);
  const [category, setCategory] = useState(CATEGORY_INITIAL_VALUE);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [author, setAuthor] = useState("");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
      setSelectedArticles([]);
      setSelectedCategory(categories[0]);
      setAuthor(categories[0].author.name);
      setActive(categories[0].category);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSelectedCategory = ({ id, category, position, articles }) => {
    setActive(category);
    setSelectedCategory({ id, category, position, articles });
  };

  const handleCreateCategory = () => {
    setShowPane(true);
    setIsEdit(false);
    setCategory(CATEGORY_INITIAL_VALUE);
  };

  const handleEditCategory = (category, id) => {
    setShowPane(true);
    setIsEdit(true);
    setCategory({ category, id });
  };

  const handleDeleteCategory = (category, id, articles) => {
    setShowDeleteAlert(true);
    setDeletedCategory({ category, id, articles });
  };

  const handleUpdateWithPosition = async (position, id) => {
    try {
      await categoriesApi.updateWithPosition(position, id);
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

  const handleSearch = async searchTerm => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch({ category: searchTerm });
      setSearchedCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleMoveToCategory = async (id, selectedArticles) => {
    try {
      await articlesApi.moveToCategory({
        article_ids: selectedArticles,
        category_id: id,
      });
    } catch (error) {
      logger.error(error);
    }
    setSelectedArticles([]);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex w-2/3">
      <div className="ml-10 mt-6 mr-12">
        <span className="flex">
          <Typography className="mb-6 mr-20" style="h2">
            Manage Categories
          </Typography>
          <Button
            className="h-8"
            label="+"
            size="medium"
            tooltipProps={{
              content: "Add Article",
            }}
            onClick={handleCreateCategory}
          />
        </span>
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="categories">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map(
                    ({ id, category, articles, position }, index) => (
                      <Draggable
                        draggableId={String(id)}
                        index={index}
                        key={id}
                      >
                        {provided => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div
                              key={id}
                              className={`h-18 mb-3 p-2 ${
                                active === category && "bg-indigo-100"
                              }`}
                              onClick={() =>
                                handleSelectedCategory({
                                  id,
                                  category,
                                  articles,
                                  position,
                                })
                              }
                            >
                              <Category
                                articles={articles}
                                category={category}
                                handleDeleteCategory={handleDeleteCategory}
                                handleEditCategory={handleEditCategory}
                                id={id}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      {showPane && (
        <Form
          category={category}
          fetchCategories={fetchCategories}
          isEdit={isEdit}
          setShowPane={setShowPane}
          showPane={showPane}
        />
      )}
      <div className="mt-6 w-3/4">
        <span className="flex">
          <Typography className="mr-auto mb-6" style="h2">
            Manage Articles
          </Typography>
          <span className="mb-5">
            <Dropdown
              buttonSize="small"
              buttonStyle="secondary"
              closeOnSelect={false}
              label="Move To"
            >
              <div className="flex flex-col gap-y-1 rounded-md p-3">
                <Input
                  placeholder="Search members"
                  prefix={<Search />}
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
                <Typography style="body3">Results</Typography>
                <Menu>
                  {(searchTerm !== "" ? searchedCategories : categories).map(
                    ({ category, id }) => (
                      <MenuItem.Button
                        key={id}
                        onClick={() =>
                          handleMoveToCategory(id, selectedArticles)
                        }
                      >
                        {category}
                      </MenuItem.Button>
                    )
                  )}
                </Menu>
              </div>
            </Dropdown>
          </span>
        </span>
        {showBanner && <Banner setShowBanner={setShowBanner} />}
        <Articles
          author={author}
          selectedArticles={selectedArticles}
          selectedCategory={selectedCategory}
          setSelectedArticles={setSelectedArticles}
        />
        {showDeleteAlert && (
          <DeleteAlert
            categories={categories}
            deletedCategory={deletedCategory}
            fetchCategories={fetchCategories}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
