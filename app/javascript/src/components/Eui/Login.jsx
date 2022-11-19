import React from "react";

import { Formik, Form } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import authApi from "apis/admin/auth";
import { setToLocalStorage } from "utils/storage";

import Vector from "../../../../assets/images/Vector.png";

const Login = ({ history, name }) => {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login({
        password: values.password,
        name,
      });
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      history.push("/public/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
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
              {`${name} is password protected!`}
            </Typography>
            <Typography
              className="text-2xl font-semibold text-gray-500 "
              style="body3"
            >
              {`Enter the password to gain access to ${name}.`}
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
