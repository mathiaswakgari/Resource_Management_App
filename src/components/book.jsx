import React, { Component } from "react";
import Card from "../components/common/card";
class Book extends Component {
  state = {};
  render() {
    const { book } = this.props;
    return <Card book={book} />;
  }
}

export default Book;
