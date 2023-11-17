import React, { useState } from "react";
import { useFormik } from "formik";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-05.json";

//css
import "./styles/signup.styles.css";

// icons
import { LuAtSign } from "react-icons/lu"; // username
import { IoLockClosedOutline } from "react-icons/io5"; // lock
import Input from "./components/Input";

function SignUp() {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validate: () => null,
    onSubmit: () => null,
  });

  console.log(formik.values.username);

  return (
    <div className="signup">
      {/**** lottie */}
      <div className="signup-lottie">
        <Lottie options={defaultLottieOptions} />
      </div>
      {/**** form */}
      <form className="signup-form">
        <h1 className="signup-form-heading">Create Account</h1>
        <p className="signup-form-description">Let's get you setup.</p>

        {/**** username */}
        <Input
          name="username"
          formik={formik}
          type="text"
          icon={<LuAtSign size={15} color="#fff" />}
          label="username"
        />

        {/*** password */}
        <Input
          name="password"
          formik={formik}
          type="password"
          icon={<IoLockClosedOutline size={15} color="#fff" />}
          label="password"
        />

        {/**** confirm password */}
        <Input
          name="confirmPassword"
          formik={formik}
          type="password"
          icon={<IoLockClosedOutline size={15} color="#fff" />}
          label="confirm password"
        />

        {/**** call to action */}
        <div className="signup-form-submit">Create account</div>
      </form>
    </div>
  );
}

export default SignUp;
