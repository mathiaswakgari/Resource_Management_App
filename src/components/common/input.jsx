import React, { Component } from "react";
class Input extends Component {
  state = {};
  render() {
    const {
      onChange,
      required,
      label,
      error,
      name,
      type,
      id,
      placeholder,
      className,
      value,
    } = this.props;
    return (
      <div>
        {/* <label htmlFor={id}>{label}</label> */}
        <input
          type={type}
          className={className}
          id={id}
          aria-describedby="emailHelp"
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
        />
        {error && (
          <div
            className="alert alert-danger mt-3 d-flex justify-content-center align-items-center align-content-center"
            style={{ height: "20px" }}
          >
            {JSON.parse(JSON.stringify(error))}
          </div>
        )}
      </div>
    );
  }
}

export default Input;
