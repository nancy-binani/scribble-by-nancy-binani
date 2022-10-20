import React, { useState, useEffect } from "react";

import { Delete, Edit, Reorder, Plus } from "@bigbinary/neeto-icons";
import { PageLoader, Typography } from "@bigbinary/neetoui";

import categoriesApi from "apis/categories";

import { CATEGORY_INITIAL_VALUE } from "../Articles/constants";
import CreateCategory from "../Articles/CreateCategory";

const ManageCategories = () => {
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState();
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    setIsEdit(false);
    setCategoryValue(CATEGORY_INITIAL_VALUE);
    setCreateNewCategory(!createNewCategory);
  };
  const handleEditCategory = (category, id) => {
    setCreateNewCategory(createNewCategory => !createNewCategory);
    setIsEdit(true);
    setCategoryValue({ category, id });
  };
  const handleDeleteCategory = async (id, idx) => {
    try {
      if (categories[idx]["assigned_articles"].length !== 0) {
        categories.map(category => {
          if (category["category"] === "General") {
            category["assigned_articles"].push(
              categories[idx]["assigned_articles"]
            );
          }
        });
      }
      await categoriesApi.destroy(id);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

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
          isEdit={isEdit}
          setCreateNewCategory={setCreateNewCategory}
        />
      )}
      {categories.map((element, idx) => (
        <div
          className="border-b my-6 flex justify-between border-solid tracking-tight"
          key={idx}
        >
          <div className="flex">
            <Reorder color="gray" size={20} />
            <Typography className="ml-3" style="h4">
              {element["category"]}
            </Typography>
          </div>
          <div className="flex">
            <Edit
              className="ml-3"
              color="gray"
              size={20}
              onClick={() =>
                handleEditCategory(element["category"], element["id"])
              }
            />
            <Delete
              color="gray"
              size={20}
              onClick={() => handleDeleteCategory(element["id"], idx)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCategories;
