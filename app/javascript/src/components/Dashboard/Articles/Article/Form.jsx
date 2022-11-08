import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ isEdit, article, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedCategory, setUpdatedCategory] = useState({
    value: "",
    label: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      setLoading(false);
      const categoryList = categories.map(category => ({
        value: category.id,
        label: category.category,
      }));
      handleInitialValueOnEdit(categories);
      setCategories(categoryList);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInitialValueOnEdit = categories => {
    if (isEdit) {
      setStatus(article.status);
      const editedCategory = categories.map(
        ({ id }) => id === article.category_id
      );
      const editedArticleCategoryId = editedCategory.indexOf(true);
      setUpdatedCategory({
        value: categories[editedArticleCategoryId].id,
        label: categories[editedArticleCategoryId].category,
      });
      setCategoryId(editedArticleCategoryId);
    }
  };

  const handleSubmit = async values => {
    if (values.status === "") values.status = status;

    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            category_id: updatedCategory.value,
          },
          values.id
        );
      } else {
        await articlesApi.create({
          ...values,
          category_id: updatedCategory.value,
        });
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
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(categories)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
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
          <div className="mt-4 flex gap-2">
            <div className="flex">
              <Button
                className="mr-px"
                label={status === "draft" ? "Save Draft" : "Published"}
                name="status"
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown>
                <Menu>
                  {STATUS.map((status, idx) => (
                    <MenuItem.Button
                      disabled={isSubmitting}
                      key={idx}
                      value={status}
                      onClick={() => {
                        setFieldValue(
                          "status",
                          status !== "draft" ? "published" : "draft"
                        );
                        setStatus(status);
                      }}
                    >
                      {status}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              disabled={isSubmitting}
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/")}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
