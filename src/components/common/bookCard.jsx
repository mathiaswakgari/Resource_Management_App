import React, { Component } from "react";
import { deleteBook } from "../../services/auth";
class BookCard extends Component {
  state = {};
  onDelete(id) {
    deleteBook(id);
    window.location.reload();
  }
  onUpdate(id) {
    console.log(id);
    window.location.href = `/books/${id}`;
  }
  render() {
    const { book } = this.props;
    let title = book.title;
    if (book.title.length > 20) {
      title = book.title.slice(0, 20) + "...";
    }
    let author = book.author;
    if (book.author.length > 10) {
      author = book.author.slice(0, 10) + "...";
    }
    return (
      <div className="card my-2 mx-2" style={{}}>
        <div className="card-body d-flex flex-column ">
          <h5 className="card-title text-dark">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Author: {author}</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Department: {book.filter}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Target year: {book.year}
          </h6>
          <div className="justify-content-end ">
            <button
              onClick={() => this.onDelete(book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => this.onUpdate(book._id)}
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

export default BookCard;
