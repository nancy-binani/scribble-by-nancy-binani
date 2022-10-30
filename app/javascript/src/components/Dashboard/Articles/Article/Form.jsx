import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { ActionDropdown, Button, PageLoader, Toastr } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = ActionDropdown;
const Form = ({ isEdit, article, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setCategories(categoriesArray);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleStatus = (values, item) => {
    values.status = item;
    setSubmitted(true);
    handleSubmit(values);
  };

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            author: "Oliver Smith",
            category_id: values.category.value,
          },
          values.id
        );
        Toastr.success("Article is updated successfully");
      } else {
        await articlesApi.create({
          ...values,
          author: "Oliver Smith",
          category_id: values.category.value,
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
