import React, { useState } from "react";

function Input({ name, label, formik, type, icon }) {
  const [used, setUsed] = useState(false);
  console.log(used);
  return (
    <label className="input">
      <div
        onClick={() => setUsed(true)}
        className={`input-label ${used ? "opened" : ""}`}
      >
        {icon && icon}
        <p className="input-label-text">{label}</p>
      </div>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        autoComplete="off"
        className="input-input"
        onFocus={() => setUsed(true)}
      />
    </label>
  );
}

export default Input;
