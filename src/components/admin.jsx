import React, { Component } from "react";
import { getBooks, getUsers, getVideos } from "../services/auth";
import UserCard from "./common/userCard";
import BookCard from "./common/bookCard";
import { wait } from "joi-browser";
import AdminVideoCard from "./common/adminVideoCard";

class Admin extends Component {
  state = {
    users: [],
    books: [],
    videos: [],
  };

  async componentDidMount() {
    const users = await getUsers(localStorage.getItem("token"));
    const books = await getBooks();
    const { data: videos } = await getVideos();
    this.setState({ users, books, videos });
  }

  render() {
    if (!localStorage.getItem("token")) window.location.replace("/login");
    return (
      <div
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
        className={"text-white"}
      >
        <div className="d-flex flex-column" style={{ padding: "100px 0" }}>
          <h1 className="text-center">Admin Section</h1>
          <div className="container">
            <div className="row mb-5">
              <h2 className="mx-2">Users</h2>
              <div className="adminUsers">
                {this.state.users.map(function (user) {
                  return <UserCard key={user.email} user={user} />;
                })}
              </div>
            </div>
            <div className="row mb-5">
              <h2 className="mx-2">Books</h2>
              <div className="adminBooks">
                {this.state.books.map(function (book) {
                  return <BookCard key={book._id} book={book} />;
                })}
              </div>
            </div>
            <div className="row mb-5">
              <h2 className="mx-2">Videos</h2>
              <div className="adminVideos">
                {this.state.videos.map(function (video) {
                  return <AdminVideoCard key={video._id} video={video} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
