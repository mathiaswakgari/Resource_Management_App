import React, { Component } from "react";
/* import { getBooks } from "../services/bookService"; */
import { paginate } from "../utils/paginate";
import Book from "./book";
import { getBooks } from "../services/auth";
import DropdownSearch from "./common/dropdownsearch";
import Pagination from "./common/pagination";
import DropDown from "./common/dropdown";

class Books extends Component {
  state = {
    books: [],
    currentPage: 1,
    pageSize: 6,
    query: "",
    filter: "",
    year: 0,
  };

  async componentDidMount() {
    const books = await getBooks();
    this.setState({ books });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleQueryChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
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
    if (!localStorage.getItem("token")) window.location.replace("/login");
    const { query, filter, year } = this.state;
    let filteredBooks = this.state.books;

    if (filter) {
      filteredBooks = this.state.books.filter((book) => book.filter === filter);
    }

    if (year != 0) {
      filteredBooks = this.state.books.filter((book) => book.year == year);
      console.log(filteredBooks);
    }

    if (year != 0 && filter) {
      filteredBooks = this.state.books.filter(
        (book) => book.year == year && book.filter === filter
      );
    }

    if (query) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    const books = paginate(
      filteredBooks,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="books-container">
        <div className="d-flex flex-column align-items-center ">
          <h2 className="text-center section">Books Section</h2>
          <div className="mt-5">
            <DropdownSearch
              onQueryChange={this.handleQueryChange}
              onFilterChange={this.handleFilterChange}
            />
          </div>

          <DropDown onYearChange={this.handleYearChange} />

          <div className="books mt-5 mb-5">
            {books.length === 0 && (
              <h3 className="text-center">
                Looks like we don't have the book you're looking for yet.
              </h3>
            )}
            {books.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
        </div>
        <Pagination
          itemsCount={filteredBooks.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Books;
