import React, { Component } from "react";
import Card from "./common/card";
import Book from "./book";
import { Link } from "react-router-dom";
import DropdownSearch from "./common/dropdownsearch";

import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

import IFrame from "./common/iframe";
import VideoCard from "./common/videoCard";
import { getVideos, getBooks } from "../services/auth";
class Home extends Component {
  state = {
    selectedFilter: "",
    query: "",
    videos: [],
    currentPage: 1,
    pageSize: 3,
    books: [],
  };

  async componentDidMount() {
    const { data: videos } = await getVideos();
    const books = await getBooks();
    this.setState({ videos, books });
  }
  render() {
    console.log(this.state.books);
    const items = paginate(
      this.state.books,
      this.state.currentPage,
      this.state.pageSize
    );
    const someBooks = this.state.books.slice(0, 3);
    const someVideos = this.state.videos.slice(0, 3);

    if (!localStorage.getItem("token")) return window.location.href === "/";

    return (
      <div
        className="d-flex flex-column"
        style={{
          background: "#272727",
          minHeight: "100vh",
        }}
      >
        <div>
          {" "}
          {/* Books Section */}
          <h2 className="text-center mt-5" style={{ paddingTop: "100px" }}>
            Some of the books in store:{" "}
          </h2>
          <div
            className="cards_ mt-5"
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              justifyContent: "center",
              gap: "20px 20px",
            }}
          >
            {someBooks.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
        </div>
        <div className="mt-5 mb-5 homeVideos">
          {/* Lecture Section */}
          <h2 className="text-center mb-5">Check out our Video Lectures: </h2>
          <div className="d-flex justify-content-center">
            {someVideos.map((video) => (
              <VideoCard key={video.link} video={video} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
