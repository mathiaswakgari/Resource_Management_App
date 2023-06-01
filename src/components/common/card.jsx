import React, { Component } from "react";
import { Link } from "react-router-dom";
import { downloadBook } from "../../services/auth";
class Card extends Component {
  state = {
    liked: false,
    /* disliked: false, */
  };

  handleClick = (book) => {
    downloadBook(book);
  };

  render() {
    const { book } = this.props;
    let title = book.title;
    let author = book.author;
    if (book.title.length > 30) {
      title = book.title.slice(0, 29) + "...";
    }
    if (book.author.length > 20) {
      author = book.author.slice(0, 20) + "...";
    }

    return (
      <div
        className="card hover card_"
        style={{
          background: "#434343",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: "20rem",
        }}
      >
        <div className="card-body" style={{}}>
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2">{author}</h6>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <Link to={book.path} className="card-link btn btn-primary">
              Download
            </Link> */}
            <button
              className="btn btn-primary"
              onClick={() => this.handleClick(book)}
            >
              Download
            </button>

            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
