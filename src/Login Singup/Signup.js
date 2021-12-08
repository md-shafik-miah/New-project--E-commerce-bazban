import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import TextError from "./TextError";
import "./login.css";
import Login from "./Login";
import FormControl from "./FormControl";
import axios from "axios";

function Signup() {
  const initialValues = {
    name: "",
    phone: "",
    password: "",
    gender: "",
  };

  const [passwordShown, setPasswordShown] = useState(false); // password show/hide
  const [loading, setloading] = useState(false)
  const [redirect, setredirect] = useState(null)
  const [errorMessage, seterrorMessage] = useState("")

  const togglePasswordVisiblity = () => {
    // password show/hide toggle icon
    setPasswordShown(passwordShown ? false : true);
  };

  const options = [
    // gender radio button option
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Others", value: "others" },
  ];

  const validationSchema = Yup.object({
    // Form Validation
    name: Yup.string().required("Enter Your Name"),
    phone: Yup.number().required("Enter your mobile number"),
    password: Yup.string().required("fill up the field"),
  });

  const onSubmit = async (values) => {
    try {
      setloading(true)
      seterrorMessage("")
      const user = await axios.post("https://baz-back.herokuapp.com/graphql", {
        query: `
            mutation{
                createUser(userInput:
                {
                    user_name:"${values.name}",
                    phone:"+88${values.phone}",
                    password:"${values.password}",
                    gender:"${values.gender}"
                }
                ){
                    success
                    error_message
                    token
                    userId
                    userName
                    phone
                }
            }`,
      });
      console.log("User", user);
      setloading(false)

     

      if (user.data.data.createUser.success) {
        localStorage.setItem('TOKEN', user.data.data.createUser.token);
        setredirect ( <Redirect to="/"/>)  
      }else {
        seterrorMessage(user.data.data.createUser.error_message)
      }
    } catch (error) {
      setloading(false)
      throw error;
    }
  };

  return (
    <>
      <div className="login">
        {
          redirect
        }
        {
          loading ?
          <div className="loader">Loading....</div>: null
        }
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Bazban</h1>
        <h4 style={{ color: "#066D57", fontSize: "20px" }}>Sign Up </h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="formGroup">
                  <Field
                    type="text"
                    id="phone"
                    name="name"
                    placeholder="Your Name"
                  />
                </div>
                <ErrorMessage name="name" component={TextError} />

                <div className="formGroup">
                  <div className="mobile">
                    <label style={{ flex: "auto" }} htmlFor="phone_number">
                      +88
                    </label>
                    <Field
                      style={{ borderLeft: "1px solid dimgray", flex: "90%" }}
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
                <ErrorMessage name="phone" component={TextError} />

                <div className="formGroup">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Field
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      style={{
                        border: "none",
                        outline: "none",
                        fontSize: "20px",
                        backgroundColor: "white",
                        color: "gray",
                        marginRight: "5px",
                      }}
                      onClick={togglePasswordVisiblity}
                    >
                      {passwordShown ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <ErrorMessage name="password" component={TextError} />

                <div>
                  <p
                    style={{
                      textAlign: "left",
                      margin: "15px 0px",
                      fontWeight: "bold",
                    }}
                  >
                    Gender
                  </p>
                  <FormControl
                    control="radio"
                    name="gender"
                    radioButtons={options}
                  />
                </div>
                <p style={{color:"red"}}>{errorMessage}</p>

                <button
                  style={{
                    width: "60%",
                    backgroundColor: "#066D57",
                    color: "white",
                    padding: "8px",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    borderRadius: "4px",
                    margin: "10px 0px",
                  }}
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Create Account
                </button>
              </Form>
            );
          }}
        </Formik>
        <h4>
          Already have an account?{" "}
          <Link style={{ color: "#028562" }} to="/login">
            Sign In
          </Link>
        </h4>
        <Route path="/login" component={Login} />
      </div>
    </>
  );
}
export default Signup;
