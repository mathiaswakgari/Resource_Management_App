import React, { Component } from "react";
import { deleteUser } from "../../services/auth";

class UserCard extends Component {
  state = {};
  onButtonClick = (id) => {
    deleteUser(id);
    window.location.reload();
  };
  render() {
    const { user } = this.props;
    return (
      <div className="card my-2 mx-2" style={{ height: "7.6rem" }}>
        <div className="card-body">
          <h5 className="card-title text-dark">{user.fullName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
          <button
            onClick={() => this.onButtonClick(user._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default UserCard;
