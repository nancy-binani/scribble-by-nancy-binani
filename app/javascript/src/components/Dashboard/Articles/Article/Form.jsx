import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ isEdit, article, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [status, setStatus] = useState("Draft");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
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
    }
  };

  const handleSubmit = async values => {
    if (values.status === "") values.status = status;
    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            category_id: values.category.value,
          },
          values.id
        );
      } else {
        await articlesApi.create({
          ...values,
          category_id: values.category.value,
        });
      }
      await articlesApi.fetch();
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (categories.length === 0 || loading) return <PageLoader />;

  return (
    <Formik
      initialValues={{ ...article, category: updatedCategory }}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(categories)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
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
                disabled={!dirty}
                label={status === "Draft" ? "Save Draft" : "Published"}
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
                          status !== "Draft" ? "Published" : "Draft"
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
