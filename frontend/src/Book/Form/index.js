import React, { Component } from "react";
import axiosClient from "../../axiosClient";
import axios from "axios";
import "./Index.css";

class BookForm extends Component {
  state = {
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    book: {
      id: this.props.match.params.id,
      title: "",
      description: "",
      author: "",
      pages: null,
      publication: null
    },
    errors: {}
  };

  componentWillMount() {
    if (this.props.match.params.id) {
      //A GET response can contain parameters in the URL
      axiosClient.get(`/books/${this.props.match.params.id}`).then(response => {
        console.log(response.data);
        this.setState({
          book: {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            author: response.data.author,
            pages: response.data.pages,
            publication: response.data.publication
          }
        });
      });
    }
  }

  handleChange = e => {
    this.setState({
      book: {
        ...this.state.book,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div className="BookForm">
        <div className="im">
          <img src="https://cdn1.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Pencil3.png" />
        </div>
        <form method="POST" onSubmit={this.handleSubmit}>
          <div className="content">
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.book.title}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.book.description}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <textarea
                name="author"
                type="text"
                onChange={this.handleChange}
                value={this.state.book.author}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Pages</label>
              <input
                type="number"
                name="pages"
                onChange={this.handleChange}
                value={this.state.book.pages}
                className="numeric decimal form-control"
              />
            </div>
            <div>
              <label>Publication</label>
              <input
                type="date"
                name="publication"
                onChange={this.handleChange}
                value={this.state.book.publication}
                className="date form-control"
              />
            </div>
            <br />
            <button
              disabled={this.state.isSubmittingForm}
              onClick={e => this.handleFormSubmit()}
              className="btn btn-primary"
            >
              {this.state.isSubmittingForm ? "Saving..." : "Save"}
            </button>
            &nbsp;
            <button
              disabled={this.state.isSubmittingForm}
              onClick={e => this.handleCancel()}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleCancel() {
    this.props.history.push("/books");
  }

  buildFormData() {
    let formData = new FormData();
    formData.append("book[title]", this.state.book.title);
    formData.append("book[description]", this.state.book.description);
    formData.append("book[author]", this.state.book.author);
    formData.append("book[pages]", this.state.book.pages);
    formData.append("book[publication]", this.state.book.publication);

    return formData;
  }

  submitForm() {
    let submitMethod = this.state.book.id ? "patch" : "post";
    let url = this.state.book.id
      ? `/books/${this.state.book.id}.json`
      : "/books.json";

    axiosClient[submitMethod](url, this.buildFormData(), {
      onUploadProgress: progressEvent => {
        let percentage = (progressEvent.loaded * 100.0) / progressEvent.total;
        this.setState({
          submitFormProgress: percentage
        });
      }
    })
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push("/books");
      })
      .catch(error => {
        let { book } = this.state;
        book.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          book: book
        });
      });
  }

  handleFormSubmit() {
    let { book } = this.state;
    book.errors = {};
    this.setState(
      {
        isSubmittingForm: true,
        book: book
      },
      () => {
        this.submitForm();
      }
    );
  }
}

export default BookForm;
