import React, { Component } from "react";
import Joi from "joi-browser";
import { profile } from "../services/auth";
import { Link } from "react-router-dom";
class Profile extends Component {
  state = {
    account: { password: "" },
    errors: null,
    user: { fullName: "Loading", email: "Loading" },
  };
  schema = {
    password: Joi.string().min(8).max(30).required().label("Password"),
  };
  handleChange = (e) => {
    const account = { ...this.state.account };
    account["password"] = e.target.value;
    this.setState({ account });
  };
  validate = () => {
    const result = Joi.validate(this.state.account, this.schema);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const jwt = localStorage.getItem("token");
    profile(this.state.account.password, this.state.user._id, jwt);

    window.location.replace("/home");
  };
  async componentDidMount() {
    const user = await this.props.user;
    this.setState({ user });
    this.render();
  }
  componentDidUpdate() {
    if (this.state.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
    this.render();
  }
  render() {
    if (!localStorage.getItem("token")) window.location.replace("/login");
    return (
      <React.Fragment>
        <div
          style={{ backgroundColor: "#272727", minHeight: "100vh" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h1 className="mb-5">Profile Section</h1>
          <form onSubmit={this.handleSubmit} style={{ minWidth: "400px" }}>
            <div className="form-group">
              <label> Full Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mb-3"
                placeholder={this.state.user["fullName"]}
                disabled
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label> Email:</label>
              <input
                type="email"
                name="name"
                id="email"
                className="form-control"
                readOnly
                placeholder={this.state.user["email"]}
                disabled
              />
            </div>
            <div className="form-group mb-3">
              <label> Password:</label>
              <input
                type="password"
                name="name"
                id="password"
                className="form-control"
                onChange={this.handleChange}
              />

              {this.state.errors && (
                <div className="alert alert-danger mt-2 text-center">
                  {this.state.errors["password"]}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
