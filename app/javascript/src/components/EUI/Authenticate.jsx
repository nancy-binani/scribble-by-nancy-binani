import React from "react";

//import {Vector} from "../../../../assets/images";
import { Typography, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

const Authenticate = () => (
  <>
    <Typography
      className="border-text-gray-400 border-b flex justify-center border-solid bg-white py-3"
      style="h4"
    >
      Spinkart
    </Typography>
    <div className="my-8 flex justify-center">
      <Formik initialValues={{ password: "" }}>
        <Form>
          <Typography
            className="text-2xl font-semibold not-italic leading-9"
            style="h3"
          >
            Spinkart is password protected!
          </Typography>
          <Typography
            className="text-2xl font-semibold text-gray-500 "
            style="body3"
          >
            Enter the password to gain access to spinkart.
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
    {/*
      <img src={Vector} height={250} width={250} alt="no"></img> */}
  </>
);

export default Authenticate;
