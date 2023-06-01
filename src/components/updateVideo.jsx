import React, { Component } from "react";
import Input from "./common/input";
import DropDown from "../components/common/dropdown";
import { getVideo, uploadVideo } from "../services/auth";
import DropDownYear from "./common/dropDownYear";
import DropDownFilter from "./common/dropDownFilter";
class UpdateVideo extends Component {
  state = {
    video: {
      title: "",
      description: "",
      year: 0,
      filter: "SE",
      link: "",
    },
  };
  async componentDidMount() {
    const { data: video } = await getVideo(this.props.match.params.id);
    this.setState({ video });
  }
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
    return (
      <div
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="mb-5">Update Video</h1>
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
              value={this.state.video.title}
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <label>Link</label>
            <Input
              onChange={this.handleChange}
              label="link"
              type="text"
              /* error={this.state.description.author} */
              name="link"
              id="link"
              value={this.state.video.link}
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <label>Description: </label>
            <Input
              onChange={this.handleChange}
              label="description"
              type="text"
              /* error={this.state.description.author} */
              name="description"
              id="description"
              value={this.state.video.description}
              className="form-control"
              required={true}
            />
          </div>
          <div className="form-group mb-3">
            <label>Department: </label>
            <DropDownFilter onFilterChange={this.handleChange} />
          </div>
          <div className="form-group mb-3">
            <label>Year: </label>
            <DropDownYear onYearChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateVideo;
