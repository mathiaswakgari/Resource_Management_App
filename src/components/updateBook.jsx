import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import { updateBook, getBook } from "../services/auth";
import DropDownFilter from "./common/dropDownFilter";
import DropDownYear from "./common/dropDownYear";
import { Link } from "react-router-dom";
class UpdateBook extends Component {
  state = {
    description: {
      title: "",
      author: "",
      year: "",
      filter: "SE",
    },
  };
  schema = {
    title: Joi.string().required().label("Book Title"),
    author: Joi.string().required().label("Author"),
    filter: Joi.string().required().label("Department"),
    year: Joi.number().min(1).max(5).required().label("Year"),
  };
  async componentDidMount() {
    const { data: book } = await getBook(this.props.match.params.id);
    this.setState({ description: book });
  }
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

  handleChange = (e) => {
    const description = { ...this.state.description };
    description[e.target.name] = e.target.value;
    this.setState({ description });

    /* console.log(this.state.description); */
  };
  handleSubmit = (e) => {
    try {
      e.preventDefault();
      /* const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return; */
      console.log(this.state.description);
      updateBook(this.state.description);
      window.location.replace("/admin");
    } catch (e) {
      /* const { response } = JSON.parse(JSON.stringify(error));
      console.log(response); */
    }
  };
  render() {
    return (
      <div
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="mb-5">Update Book</h1>
        <form
          onSubmit={this.handleSubmit}
          style={{
            minWidth: "450px",
          }}
        >
          <div className="form-group mb-3">
            <label>Title: </label>
            <Input
              onChange={this.handleChange}
              label="Title"
              type="text"
              name="title"
              /* error={this.state.description.title} */
              id="title"
              value={this.state.description.title}
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <label>Author: </label>
            <Input
              onChange={this.handleChange}
              label="author"
              type="text"
              /* error={this.state.description.author} */
              name="author"
              id="author"
              value={this.state.description.author}
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <label>Department: </label>
            <DropDownFilter
              onFilterChange={this.handleChange}
              value={this.state.description.filter}
            />
          </div>
          <div className="form-group mb-3">
            <label>Year: </label>
            <DropDownYear
              onYearChange={this.handleChange}
              value={this.state.description.year}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateBook;
