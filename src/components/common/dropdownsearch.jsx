import React, { Component } from "react";
class DropdownSearch extends Component {
  state = {};
  render() {
    const { onFilterChange, onQueryChange } = this.props;
    return (
      <React.Fragment>
        <div
          className="dropdown"
          style={{
            borderBottomRightRadius: "15px",
            borderTopRightRadius: "15px",
            borderBottomLeftRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          <div
            className="input-group-prepend select"
            style={{ borderRadius: "15px" }}
          >
            <select
              className="form-select"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onChange={onFilterChange}
              style={{
                paddingTop: "12px",
                paddingBottom: "8px",
                borderRight: "none",
                outline: "none",
              }}
            >
              <option className="dropdown-item" value={""}>
                All
              </option>
              <option className="dropdown-item" value={"SE"}>
                Software Engineering
              </option>
              <option className="dropdown-item" value={"EE"}>
                Electrical Engineering
              </option>
            </select>
          </div>
          <input
            type="text"
            className="form-control outline"
            aria-label="Text input with dropdown button"
            onChange={onQueryChange}
            style={{
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          />
          <div
            style={{
              position: "absolute",
              color: "black",
              right: "15px",
              top: "6px",
            }}
          >
            <i className="fa fa-search form-control btn"></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DropdownSearch;
