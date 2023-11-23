import React, { useState } from "react";

// css
import "../styles/input.styles.css";

// default icons
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function Input({
  name,
  label,
  formik,
  type,
  icon,
  usernameExists,
  usernameTaken,
  setUsernameTaken,
}) {
  const [used, setUsed] = useState(false);
  const error = formik.errors[name] ? true : false;
  const touched = formik.touched[name];

  const handleUsernameInput = async ({ target: { value } }) => {
    formik.setFieldValue("username", value);
    if (value === "") return;
    const taken = await usernameExists(value);
    setUsernameTaken(taken);
  };

  return (
    <label className="input">
      <div
        onClick={() => setUsed(true)}
        className={`input-label ${used ? "opened" : ""}`}
      >
        {icon && icon}
        <p
          className={`input-label-text ${
            !touched
              ? "#fff"
              : error || usernameTaken
              ? "error-text"
              : "success-text"
          }`}
        >
          {label}
        </p>
      </div>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={
          name === "username" ? handleUsernameInput : formik.handleChange
        }
        onBlur={formik.handleBlur}
        autoComplete="off"
        className={`input-input ${
          !touched ? "#fff" : error || usernameTaken ? "error" : "success"
        }`}
        onFocus={() => setUsed(true)}
      />

      {!touched ? (
        <></>
      ) : error || usernameTaken ? (
        <div className="status-icon error">
          <FaTimes size={12} color="#fff" />
        </div>
      ) : (
        <div className="status-icon success">
          <FaCheck size={12} color="#fff" />
        </div>
      )}

      {used && error && (
        <div className="error-message">{formik.errors[name]}</div>
      )}
      {!used || name !== "username" || error ? (
        <></>
      ) : usernameTaken ? (
        <div className="error-message">username already taken</div>
      ) : usernameTaken === false ? (
        <div className="success-message">unique username</div>
      ) : (
        <></>
      )}
    </label>
  );
}

export default Input;
