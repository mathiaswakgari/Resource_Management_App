import React, { Component } from "react";
class DropDown extends Component {
  state = {};
  render() {
    const { onYearChange } = this.props;
    return (
      <div
        className="input-group-prepend select mt-1"
        style={{ borderRadius: "15px", width: "8rem" }}
      >
        <select
          className="form-select"
          type="button"
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
        >
          <option className="dropdown-item" value={0}>
            All Years
          </option>
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

export default DropDown;
