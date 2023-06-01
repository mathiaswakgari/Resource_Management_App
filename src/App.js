import { Redirect, Route, Switch } from "react-router-dom";

import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Books from "./components/books";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import Videos from "./components/videos";
import SignUp from "./components/signup";
import LogOut from "./components/logout";
import NotFound from "./components/notFound";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import Upload from "./components/upload";
import Profile from "./components/profile";
import Admin from "./components/admin";
import UpdateBook from "./components/updateBook";
import UploadVideo from "./components/uploadVideos";
import UpdateVideo from "./components/updateVideo";

class App extends Component {
  state = { user: {} };

  getUser() {
    if (localStorage.getItem("token")) {
      const user = jwtDecode(localStorage.getItem("token"));
      /* console.log(user); */
      return user;
    }
  }

  getAdmin() {
    if (this.getUser()) return this.getUser().isAdmin;
  }

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (e) {}
  }
  render() {
    /* console.log(this.state.user); */
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="App">
          <header className="App-header">
            <NavBar user={this.getUser()} />
            <Switch>
              <Route
                path="/videos/:id"
                component={this.getUser() ? UpdateVideo : Login}
              />
              <Route
                path="/videos"
                component={this.getUser() ? Videos : Login}
              />
              <Route path="/books/:id" exact component={UpdateBook} />
              <Route path="/books" component={this.getUser() ? Books : Login} />
              <Route
                path="/home"
                exact
                component={this.getUser() ? Home : Login}
              />
              <Route
                path="/admin/upload/video"
                exact
                component={this.getAdmin() ? UploadVideo : Home}
              />
              <Route
                path="/admin"
                exact
                component={this.getAdmin() ? Admin : Login}
              />
              <Route path="/register" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={LogOut} />
              <Route
                path="/upload"
                exact
                component={this.getUser() ? Upload : Login}
              />

              <Route
                path="/profile"
                exact
                render={() => <Profile user={this.getUser()} />}
              />

              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/login" />
              <Redirect to="/not-found" />
            </Switch>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
