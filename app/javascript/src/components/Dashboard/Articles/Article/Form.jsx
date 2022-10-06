import React, { useState } from "react";

import { ActionDropdown, Button, Toastr } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form as FormikForm } from "formik";

import articlesApi from "apis/articles";

import { ARTICLES_FORM_VALIDATION_SCHEMA, CATEGORIES } from "../constants";

const { Menu, MenuItem } = ActionDropdown;
const Form = ({ history, isEdit, article }) => {
  const STATUS = ["Save Draft", "Published"];
  const [submitted, setSubmitted] = useState(false);

  const handleStatus = (values, item) => {
    values.status = item;
    setSubmitted(true);
    handleSubmit(values);
  };

  const handleSubmit = async values => {
    const arr = values.categories.map(({ label }) => label);
    try {
      if (isEdit) {
        await articlesApi.update(article.id, values);
      } else {
        await articlesApi.create({
          ...values,
          author: "Oliver Smith",
          categories: arr,
        });
        Toastr.success("Article is created successfully");
      }
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

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
              isMulti
              isSearchable
              required
              className="h-2 w-10"
              label="Category"
              name="categories"
              options={CATEGORIES}
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
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
