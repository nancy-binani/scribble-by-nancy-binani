import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader, Alert } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import {
  ARTICLES_FORM_VALIDATION_SCHEMA,
  MENU_ITEMS as menuItems,
} from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ isEdit, article, history, setIsPaneOpen }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [status, setStatus] = useState("drafted");

  const [buttonLabel, setButtonLabel] = useState(
    article.status === "published" ? "Publish" : "Save Draft"
  );
  const [showAlert, setShowAlert] = useState(false);

  const getCurrentStatus = currentStatus => {
    let status = "";
    if (currentStatus === "Save Draft") {
      status = "drafted";
    } else if (currentStatus === "Publish") {
      status = "published";
    } else if (currentStatus === "Publish/Unpublish later") {
      status = "publish/unpublish later";
    } else if (currentStatus === "Unpublish Later") {
      status = "unpublish later";
    }

    return status;
  };

  const updateLabel = ({ setButtonLabel, setFieldValue, menu }) => {
    setButtonLabel(menu);
    setFieldValue("status", getCurrentStatus(menu));
  };

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

    if (values.status !== "publish/unpublish later") {
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
    } else setIsPaneOpen(true);
  };

  const handleShowAlert = values => {
    if (article.scheduled_publish !== null && values.status === "published") {
      setShowAlert(true);
    } else if (
      article.scheduled_unpublish !== null &&
      values.status === "drafted"
    ) {
      setShowAlert(true);
    } else {
      handleSubmit(values);
    }
  };

  if (categories.length === 0 || loading) return <PageLoader />;

  return (
    <Formik
      initialValues={{ ...article, category: updatedCategory, dateTime: "" }}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(categories)}
      onSubmit={
        buttonLabel === "publish/unpublish later"
          ? handleSubmit
          : handleShowAlert
      }
    >
      {({ isSubmitting, setFieldValue, dirty, values }) => (
        <FormikForm className=" mx-auto mt-12 w-2/5 space-y-6">
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
                label={buttonLabel}
                name="status"
                size="medium"
                style="primary"
                type="submit"
                onClick={() => {
                  setSubmitted(true);
                }}
              />
              <Dropdown>
                <Menu>
                  {menuItems.map((menu, idx) => (
                    <MenuItem.Button
                      disabled={isSubmitting}
                      key={idx}
                      value={buttonLabel}
                      onClick={() => {
                        updateLabel({ setButtonLabel, setFieldValue, menu });
                        setStatus(buttonLabel);
                      }}
                    >
                      {menu}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/")}
            />
            <Alert
              isOpen={showAlert}
              message={
                buttonLabel === "Save Draft"
                  ? "This article has a unpublish schedule.If you save it as draft now then unpublish schedule will be removed.Are you sure you want to continue?"
                  : "This article has a publish schedule.If you publish it now then publish schedule will be removed.Are you sure you want to continue?"
              }
              onClose={() => setShowAlert(false)}
              onSubmit={() => {
                buttonLabel === "Save Draft"
                  ? (values.scheduled_unpublish = null)
                  : (values.scheduled_publish = null);
                handleSubmit(values);
              }}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
