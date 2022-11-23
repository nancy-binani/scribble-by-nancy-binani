import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import sitesApi from "apis/admin/sites";
import { deleteFromLocalStorage, setToLocalStorage } from "utils/storage";

import { VALID_PASSWORD_REGEX } from "./constants";

const General = () => {
  const [passwordRegexChecked, setPasswordRegexChecked] = useState(false);
  const [passwordLengthChecked, setPasswordLengthChecked] = useState(false);
  const [validationBoxOpen, setValidationBoxOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState("visible");
  const [siteDetails, setSiteDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  const validatePassword = password => {
    if (password === "*****" || !status) {
      setValidationBoxOpen(false);

      return false;
    }
    setValidationBoxOpen(true);
    setPasswordLengthChecked(password.length >= 6);
    setPasswordRegexChecked(VALID_PASSWORD_REGEX.test(password));

    return passwordLengthChecked && passwordRegexChecked;
  };

  const handleSubmit = async values => {
    const checkPassword = validatePassword(values.password);
    const updatedSiteSettings = updatedValuesForSiteSettings(values);
    try {
      if (updatedSiteSettings.validateUserInputValues || checkPassword) {
        await sitesApi.update(updatedSiteSettings.updatedSiteSettings);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const updatedValuesForSiteSettings = values => {
    const toggledStatus = status ? "checked" : "unchecked";
    const password = values.password;
    const name = values.name;
    let updatedSiteSettings = {};
    if (name !== siteDetails["name"] || password !== "*****") {
      deleteFromLocalStorage();
    }

    if (password === "*****") {
      updatedSiteSettings = { status: toggledStatus, name };
    } else {
      updatedSiteSettings = {
        status: toggledStatus,
        password,
        name,
      };
    }
    let validateUserInputValues = null;
    if (
      name !== siteDetails["name"] ||
      toggledStatus !== siteDetails["status"]
    ) {
      validateUserInputValues = true;
    }

    if (
      name === siteDetails["name"] &&
      toggledStatus === siteDetails["status"] &&
      password === "*****"
    ) {
      validateUserInputValues = false;
    }

    return { updatedSiteSettings, validateUserInputValues };
  };

  const fetchSiteDetails = async () => {
    try {
      const {
        data: { site },
      } = await sitesApi.fetch();
      setSiteDetails(site);
      setStatus(site["status"] === "checked");
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const handleStatus = () => {
    status
      ? setToLocalStorage({
          authToken: siteDetails["authentication_token"],
        })
      : deleteFromLocalStorage();
    setStatus(!status);
    setValidationBoxOpen(false);
  };

  const handleVisiblity = () => {
    setDisabled(!disabled);
    setVisible("invisible");
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto flex w-1/3 flex-col space-y-6 py-6">
      <Formik
        initialValues={{
          checked: { status },
          password: "*****",
          name: siteDetails["name"],
        }}
        onSubmit={handleSubmit}
      >
        {({ dirty }) => (
          <Form>
            <Typography style="h2">General Settings</Typography>
            <Typography className="text-gray-600" style="body2">
              Configure general attributes Of scribble
            </Typography>
            <div className="my-6">
              <Input label="Site Name" name="name" type="text" />
              <Typography className="text-gray-600" style="body3">
                Customize the site name which is used to show the site name in
              </Typography>
              <Typography className="font-semibold text-gray-700" style="body3">
                Open Graph Tags.{" "}
              </Typography>
            </div>
            <Checkbox
              checked={status}
              className="my-6"
              id="checkbox"
              label="Password Protect Knowledge Base"
              name="checked"
              onClick={handleStatus}
            />
            {status && (
              <span className="my-3 flex">
                <Input
                  disabled={disabled}
                  label="Password"
                  name="password"
                  type="password"
                />
                <Button
                  className={`mx-1 my-5 ${visible}`}
                  label="Change Password"
                  size="medium"
                  style="primary"
                  onClick={handleVisiblity}
                />
              </span>
            )}
            {validationBoxOpen && (
              <>
                <span className="flex">
                  {passwordLengthChecked ? (
                    <Check color="green" size={24} />
                  ) : (
                    <Close color="red" size={24} />
                  )}
                  <Typography className=" ml-2" style="body2">
                    Have at least 6 characters
                  </Typography>
                </span>
                <span className="flex">
                  {passwordRegexChecked ? (
                    <Check color="green" size={24} />
                  ) : (
                    <Close color="red" size={24} />
                  )}
                  <Typography className=" ml-2" style="body2">
                    Have at least 1 letter and 1 number
                  </Typography>
                </span>
              </>
            )}
            <Button
              className="mr-3"
              disabled={!dirty}
              label="Save Changes"
              size="large"
              style="primary"
              type="submit"
            />
            <Button label="Cancel" size="large" style="text" type="reset" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default General;
