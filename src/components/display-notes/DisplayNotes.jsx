import React, { Component } from "react";
import IconsBar from "../icon-bar/IconBar";
import "./DisplayNotes.css";

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="displaynotes">
        <div className="content-box">Hello World</div>
        <div className="bottom-bar">
          <IconsBar />
        </div>
      </div>
    );
  }
}

export default DisplayNotes;
