import React, { Component } from "react";
class DropDownYear extends Component {
  state = {};
  render() {
    const { onYearChange, value } = this.props;
    return (
      <div
        className="input-group-prepend select mt-1"
        style={{ borderRadius: "15px" }}
      >
        <select
          className="form-select"
          type="button"
          name="year"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onChange={onYearChange}
          style={{
            paddingTop: "6px",
            paddingBottom: "10px",
            borderRight: "none",
            outline: "none",
          }}
          value={value}
        >
          <option className="dropdown-item" value={2}>
            2nd Year
          </option>
          <option className="dropdown-item" value={3}>
            3rd Year
          </option>
          <option className="dropdown-item" value={4}>
            4th Year
          </option>
        </select>
      </div>
    );
  }
}

export default DropDownYear;
