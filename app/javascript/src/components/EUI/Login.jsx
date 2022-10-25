import React, { useEffect, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import authApi from "apis/auth";
import { setToLocalStorage } from "utils/storage";

import Vector from "../../../../assets/images/Vector.png";

const Login = ({ history }) => {
  const [sitename, setSitename] = useState("");

  const fetchSiteDetails = async () => {
    try {
      const { data } = await authApi.fetch();
      setSitename(data.sites[0].sitename);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleSubmit = async values => {
    try {
      const response = await authApi.login(values.password, sitename);
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      history.push("/public/");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  return (
    <>
      <Typography
        className="border-text-gray-400 border-b flex justify-center border-solid bg-white py-3"
        style="h4"
      >
        {sitename}
      </Typography>
      <div className="my-8 flex justify-center">
        <img alt="no" src={Vector} />
      </div>
      <div className="my-8 flex justify-center">
        <Formik initialValues={{ password: "" }} onSubmit={handleSubmit}>
          <Form>
            <Typography
              className="text-2xl font-semibold not-italic leading-9"
              style="h3"
            >
              {`${sitename} is password protected!`}
            </Typography>
            <Typography
              className="text-2xl font-semibold text-gray-500 "
              style="body3"
            >
              {`Enter the password to gain access to ${sitename}.`}
            </Typography>
            <Input
              required
              className="my-3"
              label="Password"
              name="password"
              type="password"
            />
            <Button
              className="mr-3"
              label="Continue"
              size="medium"
              style="primary"
              type="submit"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
