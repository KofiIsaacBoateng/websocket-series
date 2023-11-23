import React from "react";
import { useFormik } from "formik";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-11.json";
import loadingAnimationData from "../../assets/lottie/loading-auth.json";
import Input from "../signup/components/Input";
import { loginValidationSchema } from "../signup/utils/validationSchema";
import { NavLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

//css
import "../signup/styles/signup.styles.css";

// icons
import { LuAtSign } from "react-icons/lu"; // username
import { IoLockClosedOutline } from "react-icons/io5"; // lock

function Login() {
  const [loading, login] = useLogin();

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
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: login,
  });

  return (
    <div className="signup">
      {/**** lottie */}
      <div className="signup-lottie">
        <Lottie options={defaultLottieOptions} />
      </div>
      {/**** form */}
      <form className="signup-form">
        <h1 className="signup-form-heading">Good to see you again.</h1>
        <div className="signup-form-description">
          <p className="signup-form-alt">Don't have an account?</p>
          <NavLink className="signup-form-alt-link" to="/signup">
            Sign up
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

        {/**** call to action */}
        <button
          type="button"
          disabled={loading}
          onClick={formik.submitForm}
          className="signup-form-submit"
        >
          {loading ? (
            <Lottie
              width={20}
              height={20}
              speed={1.5}
              options={loadingLottieOptions}
            />
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
