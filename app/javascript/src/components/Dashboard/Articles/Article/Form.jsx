import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button, PageLoader, Toastr } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import authApi from "apis/auth";
import categoriesApi from "apis/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = ActionDropdown;
const Form = ({ isEdit, article, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState({
    value: "",
    label: "",
  });
  const [categoryId, setCategoryId] = useState("");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
      const categoriesArray = categories.map(element => ({
        value: element.id,
        label: element.category,
      }));
      handleInitialValueOnEdit(categories);
      setCategories(categoriesArray);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    Promise.all[(fetchCategories(), fetchUser())];
  }, []);

  const fetchUser = async () => {
    try {
      const {
        data: { users },
      } = await authApi.fetchUser();
      setUser(users);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleStatus = (values, item) => {
    values.status = item;
    setSubmitted(true);
    handleSubmit(values);
  };

  const handleInitialValueOnEdit = categories => {
    if (isEdit) {
      const matchingCategory = categories.map(
        ({ id }) => id === article.category_id
      );
      const matchingId = matchingCategory.indexOf(true);
      setUpdatedCategory({
        value: categories[matchingId].id,
        label: categories[matchingId].category,
      });
      setCategoryId(matchingId);
    }
  };

  const handleSubmit = async values => {
    const author = user[0].username;
    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            author,
            category_id: updatedCategory.value,
          },
          values.id
        );
        Toastr.success("Article is updated successfully");
      } else {
        await articlesApi.create({
          ...values,
          author,
          category_id: updatedCategory.value,
        });
        Toastr.success("Article is created successfully");
      }
      await articlesApi.fetch();
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <FormikForm className=" mx-auto mt-12 max-w-lg space-y-6">
          <div className="mt-1 flex w-full flex-row space-x-3 ">
            <Input
              required
              label="Article Title"
              name="title"
              placeholder="Enter article title"
            />
            <Select
              isSearchable
              required
              className="h-2 w-10"
              label="Category"
              name="category"
              options={categories}
              placeholder="Select Category"
              value={
                (updatedCategory.value && updatedCategory) ||
                categories[categoryId]
              }
              onChange={e =>
                setUpdatedCategory({
                  value: e.value,
                  label: e.label,
                })
              }
            />
          </div>
          <Textarea
            required
            className="mb-9 "
            label="Article Body"
            name="body"
            placeholder="Enter article description"
            rows={17}
          />
          <ActionDropdown label={isEdit ? "Update" : "Save Draft"}>
            <Menu>
              {STATUS.map((item, idx) => (
                <MenuItem.Button
                  disabled={isSubmitting}
                  key={idx}
                  type="submit"
                  value={item}
                  onClick={() => handleStatus(values, item)}
                >
                  {item}
                </MenuItem.Button>
              ))}
            </Menu>
          </ActionDropdown>
          <Button
            disabled={isSubmitting}
            label="Cancel"
            size="large"
            style="text"
            type="reset"
            onClick={() => history.push("/")}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
