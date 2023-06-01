import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NavBar extends Component {
  state = {
    /* user: {
      fullName: "Loading", email: "Loading", isAdmin: false
    }, */
  };
  /* async componentDidMount() {
    const user = await this.props.user;
    this.setState({ user });
    this.render();
  } */
  /* componentDidUpdate() {
    if (this.state.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  } */
  render() {
    const { user } = this.props;
    return (
      <div
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: "3",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to="/home" className="navbar-brand mx-2">
            Resource-Managment
          </NavLink>
          <button
            className="navbar-toggler mx-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-5">
              <NavLink to="/home" className="nav-link active hover">
                Home
              </NavLink>
              <NavLink to="/books" className="nav-link active hover">
                Books
              </NavLink>
              <NavLink to="/videos" className="nav-link active hover">
                Videos
              </NavLink>
              <NavLink to="/upload" className="nav-link active hover">
                Upload Book
              </NavLink>
              {!user && (
                <React.Fragment>
                  <NavLink to="/login" className="nav-link active hover">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link active hover">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink to="/profile" className="nav-link active hover">
                    <span style={{ fontWeight: "bold" }}>{user.fullName}</span>
                  </NavLink>
                  {user.isAdmin && (
                    <React.Fragment>
                      <NavLink to="/admin" className="nav-link active hover">
                        Admin
                      </NavLink>
                      <NavLink
                        to="admin/upload/video"
                        className="nav-link active hover"
                      >
                        Upload Video
                      </NavLink>
                    </React.Fragment>
                  )}
                  <NavLink to="/logout" className="nav-link active hover">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
