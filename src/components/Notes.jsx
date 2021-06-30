import React, { Component } from "react";
import DisplayNotes from "./DisplayNotes";

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconsDisplay: false,
    };
  }

  render() {
    return (
      <div className="displaynotes">
        <div className="content-box">Hello World</div>
        <div className="bottom-bar">
          <DisplayNotes />
        </div>
      </div>
    );
  }
}

export default Notes;
