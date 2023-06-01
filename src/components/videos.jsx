import React, { Component } from "react";
import VideoCard from "./common/videoCard";
import DropdownSearch from "./common/dropdownsearch";
import { paginate } from "../utils/paginate";
import DropDown from "./common/dropdown";
import Pagination from "./common/pagination";
import { getVideos } from "../services/auth";
class Videos extends Component {
  state = {
    videos: [],
    query: "",
    filter: "",
    currentPage: 1,
    pageSize: 6,
    year: 0,
  };
  async componentDidMount() {
    const { data: videos } = await getVideos();
    this.setState({ videos });
  }
  handleQueryChange = ({ target }) => {
    this.setState({ query: target.value });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleFilterChange = (e) => {
    const filter = e.target.value;
    this.setState({ filter, currentPage: 1 });
  };
  handleYearChange = (e) => {
    const year = e.target.value;
    this.setState({ year, currentPage: 1 });
  };

  render() {
    console.log(this.state.videos);
    if (!localStorage.getItem("token")) window.location.reload("/login");

    const { query, filter, year } = this.state;

    let filteredVideos = this.state.videos;

    if (filter) {
      filteredVideos = this.state.videos.filter(
        (video) => video.filter === filter
      );
    }
    if (year != 0) {
      filteredVideos = this.state.videos.filter((video) => video.year == year);
    }

    if (year != 0 && filter) {
      filteredVideos = this.state.videos.filter(
        (video) => video.year == year && video.filter === filter
      );
    }

    if (query) {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    const videos = paginate(
      filteredVideos,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="videos-container">
        <div className="mt-5 d-flex flex-column align-items-center">
          <h2 className="mt-5 text-center">Lectures Section</h2>
          <div className="mt-5">
            <DropdownSearch
              onQueryChange={this.handleQueryChange}
              onFilterChange={this.handleFilterChange}
            />
          </div>
          <DropDown onYearChange={this.handleYearChange} />
          <div className="videos mt-5 mb-5">
            {videos.length === 0 && (
              <h3 className="text-center">Oops, Lecture not available, yet.</h3>
            )}
            {videos.map((video) => (
              <VideoCard video={video} />
            ))}
            <div className="ml-2"></div>
          </div>
        </div>
        <Pagination
          itemsCount={this.state.videos.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Videos;
