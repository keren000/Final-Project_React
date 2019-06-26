import React, { Component } from "react";
import axiosClient from "../../axiosClient";
import axios from "axios";
import Index from "./Index.css";
import Search from "../Search/Search";

class BookIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentWillMount() {
    axiosClient.get("/books").then(response => {
      this.setState({ books: response.data });
    });
  }

  search = search_query => {
    axios
      .post("http://localhost:3000/books/search", {
        search_query
      })
      .then(({ data }) => {
        const books = data;
        this.setState({
          books
        });
      })
      .catch(error => console.error(error));
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div className="BookIndex col-sm-12" style={{ marginTop: 10 }}>
        <div className="clearfix">
          <div className="pull-right">
            <br />
            <button
              onClick={e => this.handleNewBook()}
              className="btn btn-success"
            >
              New Book
            </button>
          </div>
        </div>

        {/* onSearchClick handler for the click event of the search button, returns the search value.*/}
        <Search onSearchClick={this.search} />
        <br />
        <br />
        <table class="table table-bordered table-striped ">
          <thead>
            <tr>
              <th scope="col" class="text-center">
                #
              </th>
              <th scope="col" class="text-center">
                Title
              </th>
              <th scope="col" class="text-center">
                Description
              </th>
              <th scope="col" class="text-center">
                Author
              </th>
              <th scope="col" class="text-center">
                Pages Number
              </th>
              <th scope="col" class="text-center">
                Publication
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }

  handleNewBook() {
    this.props.history.push("/books/new");
  }

  renderTableBody() {
    return this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.description}</td>
          <td>{book.author}</td>
          <td style={{ width: 200 }}>{book.pages}</td>
          <td style={{ width: 200 }}>{book.publication}</td>
          <td style={{ width: 200 }}>
            <button
              onClick={e => this.handleEdit(book.id)}
              className="btn btn-primary"
            >
              <span className="glyphicon glyphicon-edit"> </span>
            </button>
            &nbsp;
            <button
              onClick={e => this.handleRemove(book.id)}
              className="btn btn-danger"
            >
              <span className="glyphicon glyphicon-remove" />
            </button>
          </td>
        </tr>
      );
    });
  }

  handleEdit(bookId) {
    this.props.history.push(`/books/${bookId}/edit`);
  }

  handleRemove(bookId) {
    let books = this.state.books;
    books = books.filter(book => {
      return book.id !== bookId;
    });
    this.setState({ books: books });
    axiosClient.delete(`/books/${bookId}`);
  }
}

export default BookIndex;
