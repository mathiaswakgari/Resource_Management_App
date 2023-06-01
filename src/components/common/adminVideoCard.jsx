import React, { Component } from "react";
import { deleteVideo } from "../../services/auth";
class AdminVideoCard extends Component {
  state = {};
  onDelete(id) {
    deleteVideo(id);
    window.location.reload();
  }
  onUpdate(id) {
    window.location.href = `/videos/${id}`;
  }
  render() {
    const { video } = this.props;
    return (
      <div className="card my-2 mx-2">
        <div className="card-body">
          <h5 className="card-title text-dark">{video.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Department: {video.filter}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Target year: {video.year}
          </h6>
          <div>
            <button
              onClick={() => this.onDelete(video._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => this.onUpdate(video._id)}
              className="btn btn-primary mx-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminVideoCard;
