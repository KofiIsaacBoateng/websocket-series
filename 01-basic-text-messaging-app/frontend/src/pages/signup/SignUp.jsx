import React, { useState } from "react";
import { useFormik } from "formik";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-05.json";
import loadingAnimationData from "../../assets/lottie/loading-auth.json";
import Input from "./components/Input";
import signupValidationSchema from "./utils/validationSchema";
import { NavLink } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

//css
import "./styles/signup.styles.css";

// icons
import { LuAtSign } from "react-icons/lu"; // username
import { IoLockClosedOutline } from "react-icons/io5"; // lock
import { CiUser } from "react-icons/ci"; // user

function SignUp() {
  const [loading, signup, usernameExists] = useSignup();
  const [usernameTaken, setUsernameTaken] = useState(undefined);

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const loadingLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: signup,
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

        {/**** name */}
        <Input
          name="name"
          formik={formik}
          type="text"
          icon={
            <CiUser
              size={17}
              color={
                !formik.touched.name
                  ? "#fff"
                  : formik.errors.name
                  ? "red"
                  : "lime"
              }
            />
          }
          label="name"
        />

        {/**** username */}
        <Input
          name="username"
          formik={formik}
          type="text"
          usernameExists={usernameExists}
          usernameTaken={usernameTaken}
          setUsernameTaken={setUsernameTaken}
          icon={
            <LuAtSign
              size={15}
              color={
                !formik.touched.username
                  ? "#fff"
                  : formik.errors.username || usernameTaken
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
        <button
          type="button"
          disabled={loading || usernameTaken}
          onClick={formik.submitForm}
          className="signup-form-submit"
        >
          {loading ? (
            <Lottie
              width={30}
              height={30}
              speed={1.5}
              options={loadingLottieOptions}
            />
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
