import React, { useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import Signup from "./Signup";
import TextError from "./TextError";
import "./login.css";
import axios from "axios";

function Login() {
  const initialValues = {
    phone: "",
    password: "",
  };
  
  const [loading, setLoading] = useState(false);             // show loading while logging
  const [redirect, setRedirect] = useState(null);               // after logging move to home page 
  const [passwordShown, setPasswordShown] = useState(false);       // password show/hide
  const [errorMessage, seterrorMessage] = useState("");          // show error message if no account and mismass password


  const togglePasswordVisiblity = () => {
    // password show/hide toggle icon
    setPasswordShown(passwordShown ? false : true);
  };

  const validationSchema = Yup.object({
    // Form Validation
    phone: Yup.number().required("Enter your mobile number"),
    password: Yup.string().required("fill up the field"),
  });

  const onSubmit = async (values) => {
    // form SUBMISSION
    console.log("form values", values);
    try {
      setLoading(true);
      seterrorMessage("")
      const user = await axios.post("https://baz-back.herokuapp.com/graphql", {
        query: `
          query{
            login(phone:"+88${values.phone}", password:"${values.password}"){
                    success
                    error_message
                    token
                    userId
                    userName
                    phone
                    cartTotal
                    interests
                }
            }
        `,
      });
      console.log("Login user", user);
      setLoading(false);

      if (user.data.data.login.success) {
        localStorage.setItem('TOKEN', user.data.data.login.token);
        // this.props.loginInfo(user.data.data.login);
        // ({phone: null, password: '', loading: false});
        // this.context.navigate(this.props.user.route);
        setRedirect( <Redirect to="/"/>)

      } else {
        // this.props.loginError(user.data.data.login.error_message);
        // this.setState({loading: false});
        seterrorMessage(user.data.data.login.error_message)
      }
    } catch (error) {
      setLoading(false);
      throw error;

    }
  };

  return (
    <>
      <div className="login">
        {redirect}
        {
          loading ?
          <div class="loader"></div>: null
        }
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Bazban</h1>
        <h4 style={{ color: "#066D57", fontSize: "20px" }}>Log in </h4>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
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
                    }}
                    onClick={togglePasswordVisiblity}
                  >
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <ErrorMessage name="password" component={TextError} />
                <p style={{color: "red"}}>{errorMessage}</p>

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
                    margin: "20px 0px",
                  }}
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Log In
                </button>
              </Form>
            );
          }}
        </Formik>
        <h4>
          Haven't Account?{" "}
          <Link style={{ color: "#028562" }} to="/signup">
            Create Account
          </Link>
        </h4>
        <Route path="/signup" component={Signup} />
      </div>
    </>
  );
}

export default Login;
