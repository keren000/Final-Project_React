import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <br /> <br />
        <br /> <br />
        <br /> <br />
        <br /> <br />
        <h2>
          <b>Welcome to our archive</b>
        </h2>
        <h3>The best place to archive your books!</h3>
        <br />
        <Link to="/books">
          <button className="btn btn-md btn-primary center-block">
            Get Started!
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
