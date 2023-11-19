import React, { useState } from "react";
import { useFormik } from "formik";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-05.json";
import Input from "./components/Input";
import signupValidationSchema from "./utils/validationSchema";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

//css
import "./styles/signup.styles.css";

// icons
import { LuAtSign } from "react-icons/lu"; // username
import { IoLockClosedOutline } from "react-icons/io5"; // lock

function SignUp() {
  const { updateUser, user } = useUserContext();
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: updateUser,
  });

  return (
    <div className="signup">
      {/**** lottie */}
      <div className="signup-lottie">
        <Lottie options={defaultLottieOptions} />
      </div>
      {/**** form */}
      <form className="signup-form">
        <h1 className="signup-form-heading">Let's get you setup</h1>
        <div className="signup-form-description">
          <p className="signup-form-alt">Already have an account?</p>
          <NavLink className="signup-form-alt-link" to="/login">
            Login
          </NavLink>
        </div>

        {/**** username */}
        <Input
          name="username"
          formik={formik}
          type="text"
          icon={
            <LuAtSign
              size={15}
              color={
                !formik.touched.username
                  ? "#fff"
                  : formik.errors.username
                  ? "red"
                  : "lime"
              }
            />
          }
          label="username"
        />

        {/*** password */}
        <Input
          name="password"
          formik={formik}
          type="password"
          icon={
            <IoLockClosedOutline
              size={15}
              color={
                !formik.touched.password
                  ? "#fff"
                  : formik.errors.password
                  ? "red"
                  : "lime"
              }
            />
          }
          label="password"
        />

        {/**** confirm password */}
        <Input
          name="confirmPassword"
          formik={formik}
          type="password"
          icon={
            <IoLockClosedOutline
              size={15}
              color={
                !formik.touched.confirmPassword
                  ? "#fff"
                  : formik.errors.confirmPassword
                  ? "red"
                  : "lime"
              }
            />
          }
          label="confirm password"
        />

        {/**** call to action */}
        <div onClick={formik.submitForm} className="signup-form-submit">
          Create account
        </div>
      </form>
    </div>
  );
}

export default SignUp;
