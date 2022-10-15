import React, { useEffect, useState } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Checkbox, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import authApi from "apis/authApi";

import { REGEXP } from "./constants";

const General = ({ status, setStatus }) => {
  const [passwordRegexChecked, setPasswordRegexChecked] = useState(false);
  const [passwordLengthChecked, setPasswordLengthChecked] = useState(false);
  const [validationBoxOpen, setValidationBoxOpen] = useState(false);

  const handleSubmit = async values => {
    const password = values.password;
    const sitename = values.title;
    setValidationBoxOpen(true);
    if (REGEXP.test(password)) {
      setPasswordRegexChecked(true);
    }

    if (password.length >= 6) {
      setPasswordLengthChecked(true);
    }

    try {
      const toggledStatus = status ? "checked" : "unchecked";
      await authApi.update({
        sitename,
        password,
        status: toggledStatus,
      });
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchSiteDetails = async () => {
    try {
      const {
        data: { sites },
      } = await authApi.fetch();
      sites[0]["checked"] === "checked" ? setStatus(true) : setStatus(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  });

  const handleStatus = async () => {
    setStatus(!status);
    try {
      const toggledStatus = status ? "unchecked" : "checked";
      await authApi.update({
        checked: toggledStatus,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="mx-auto my-6">
      <Formik
        initialValues={{ password: "", title: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Typography style="h2">General Settings</Typography>
          <Typography className="text-gray-600" style="body2">
            Configure general attributes Of scribble
          </Typography>
          <div className="my-6">
            <Input label="Site Name" name="title" type="text" />
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
            id="checkbox_name"
            label="Password Protect Knowledge Base"
            name="checked"
            onChange={handleStatus}
          />
          <Input
            className="my-3"
            label="Password"
            name="password"
            type="password"
          />
          {validationBoxOpen && (
            <>
              <span className="flex">
                {passwordLengthChecked ? (
                  <>
                    <Check color="green" size={24} />
                    <Typography className=" ml-2" style="body2">
                      Includes at least 6 characters
                    </Typography>
                  </>
                ) : (
                  <>
                    <Close color="red" size={24} />
                    <Typography className=" ml-2" style="body2">
                      Requires at least 6 characters
                    </Typography>
                  </>
                )}
              </span>
              <span className="flex">
                {passwordRegexChecked ? (
                  <>
                    <Check color="green" size={24} />
                    <Typography className=" ml-2" style="body2">
                      Includes at least one letter and one digit
                    </Typography>
                  </>
                ) : (
                  <>
                    <Close color="red" size={24} />
                    <Typography className=" ml-2" style="body2">
                      Requires at least one letter and one digit
                    </Typography>
                  </>
                )}
              </span>
            </>
          )}
          <Button
            className="mr-3"
            label="Save Changes"
            size="large"
            style="primary"
            type="submit"
          />
          <Button label="Cancel" size="large" style="text" type="reset" />
        </Form>
      </Formik>
    </div>
  );
};

export default General;
