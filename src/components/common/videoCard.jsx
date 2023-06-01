import React, { Component } from "react";
import IFrame from "./iframe";
import { Link } from "react-router-dom";
class VideoCard extends Component {
  state = {};
  render() {
    const { link, title, description } = this.props.video;
    let desc = description;
    if (desc.length > 30) desc = desc.slice(0, 30) + "...";
    return (
      <div
        className="card card_ -2 m-2"
        style={{
          background: "#434343",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          height: "28rem",
          width: "25rem",
        }}
      >
        <iframe src={link} allowfullscreen style={{ height: "75%" }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <a href={link} className="btn btn-primary" target="_blank">
            Watch
          </a>
        </div>
      </div>
    );
  }
}

export default VideoCard;
