import React, { Component } from "react";
import Input from "./common/input";
import { uploadVideo } from "../services/auth";
import DropDownYear from "./common/dropDownYear";
import { Link } from "react-router-dom";
import DropDownFilter from "./common/dropDownFilter";
class UploadVideo extends Component {
  state = {
    video: {
      title: "",
      description: "",
      year: 2,
      filter: "SE",
      link: "",
    },
  };

  handleChange = (e) => {
    const video = { ...this.state.video };
    video[e.target.name] = e.target.value;
    this.setState({ video });
    console.log(this.state.video);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    uploadVideo(this.state.video);
    window.location.replace("/admin");
  };
  render() {
    if (!localStorage.getItem("token")) window.location.replace("/login");
    return (
      <div
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="mb-5">Upload Video</h1>
        <form
          onSubmit={this.handleSubmit}
          style={{
            minWidth: "450px",
          }}
        >
          <div className="form-group mb-3">
            <Input
              onChange={this.handleChange}
              label="Title"
              type="text"
              name="title"
              /* error={this.state.description.title} */
              id="title"
              placeholder="Video Title"
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <Input
              onChange={this.handleChange}
              label="link"
              type="text"
              /* error={this.state.description.author} */
              name="link"
              id="link"
              placeholder="link url"
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <Input
              onChange={this.handleChange}
              label="description"
              type="text"
              /* error={this.state.description.author} */
              name="description"
              id="description"
              placeholder="Video description"
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <DropDownFilter onFilterChange={this.handleChange} />
          </div>
          <div className="form-group mb-3">
            <DropDownYear onYearChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload<Link to="/admin"></Link>
          </button>
        </form>
      </div>
    );
  }
}

export default UploadVideo;
