import React, { useState } from "react";

// css
import "../styles/input.styles.css";

// default icons
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function Input({ name, label, formik, type, icon }) {
  const [used, setUsed] = useState(false);
  const error = formik.errors[name] ? true : false;
  const touched = formik.touched[name];
  return (
    <label className="input">
      <div
        onClick={() => setUsed(true)}
        className={`input-label ${used ? "opened" : ""}`}
      >
        {icon && icon}
        <p
          className={`input-label-text ${
            !touched ? "#fff" : error ? "error-text" : "success-text"
          }`}
        >
          {label}
        </p>
      </div>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autoComplete="off"
        className={`input-input ${
          !touched ? "#fff" : error ? "error" : "success"
        }`}
        onFocus={() => setUsed(true)}
      />

      {!touched ? (
        <></>
      ) : error ? (
        <div className="status-icon error">
          <FaTimes size={12} color="#fff" />
        </div>
      ) : (
        <div className="status-icon success">
          <FaCheck size={12} color="#fff" />
        </div>
      )}
    </label>
  );
}

export default Input;
