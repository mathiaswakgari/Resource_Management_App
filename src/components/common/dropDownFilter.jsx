import React, { Component } from "react";
class DropDownFilter extends Component {
  state = {};

  render() {
    const { onFilterChange, value } = this.props;
    return (
      <div
        className="input-group-prepend select mt-1"
        style={{ borderRadius: "15px" }}
      >
        <select
          className="form-select"
          type="button"
          name="filter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onChange={onFilterChange}
          style={{
            paddingTop: "6px",
            paddingBottom: "10px",
            borderRight: "none",
            outline: "none",
          }}
          value={value}
        >
          <option className="dropdown-item" value={"SE"}>
            Software Engineering
          </option>
          <option className="dropdown-item" value={"EE"}>
            Electrical Engineering
          </option>
        </select>
      </div>
    );
  }
}

export default DropDownFilter;
