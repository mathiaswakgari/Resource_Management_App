import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { upload } from "../services/auth";
import DropDownFilter from "../components/common/dropDownFilter";
import { Link } from "react-router-dom";
import DropDownYear from "./common/dropDownYear";
class Upload extends Component {
  state = {
    description: {
      title: "",
      author: "",
      filter: "SE",
      year: 2,
    },
    file: null,
    errors: {},
  };
  schema = {
    title: Joi.string().required().label("Book Title"),
    author: Joi.string().required().label("Author"),
    filter: Joi.string().required().label("Department"),
    year: Joi.number().min(1).max(5).required().label("Year"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      this.state.description,
      this.schema,
      options
    );
    const errors = {};
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSubmit = (e) => {
    try {
      e.preventDefault();
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      const formData = new FormData();
      formData.append("title", this.state.description.title);
      formData.append("author", this.state.description.author);
      formData.append("year", this.state.description.year);
      formData.append("filter", this.state.description.filter);
      formData.append("description", this.state.description.description);
      formData.append("testImage", this.state.file);

      upload(formData);
    } catch (error) {
      const { response } = JSON.parse(JSON.stringify(error));
      console.log(response);
    }
  };
  handleChange = (e) => {
    const description = { ...this.state.description };
    description[e.target.name] = e.target.value;
    this.setState({ description });
  };
  handleFile = (e) => {
    const file = e.target.files[0];
    if (file.type != "application/pdf") console.log(file);
    this.setState({ file });
  };
  render() {
    if (!localStorage.getItem("token")) window.location.replace("/login");
    return (
      <div
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="mb-5">Upload Section</h1>
        <form
          onSubmit={this.handleSubmit}
          style={{
            minWidth: "450px",
          }}
        >
          <div className="mb-3">
            <Input
              onChange={this.handleChange}
              label="Title"
              type="text"
              name="title"
              /* error={this.state.description.title} */
              id="title"
              placeholder="Book Title"
              className="form-control"
              required={true}
            />
          </div>
          <div className="mb-3">
            <Input
              onChange={this.handleChange}
              label="author"
              type="text"
              /* error={this.state.description.author} */
              name="author"
              id="author"
              placeholder="Enter Author's full name"
              className="form-control"
              required={true}
            />
          </div>
          <div className="mb-3">
            <DropDownFilter onFilterChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <DropDownYear onYearChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <Input
              onChange={this.handleFile}
              label="File"
              type="file"
              name="testImage"
              id="file"
              placeholder="Choose File"
              className=""
              required={true}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Upload<Link to="/books"></Link>
          </button>
        </form>
      </div>
    );
  }
}

export default Upload;
