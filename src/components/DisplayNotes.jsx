import React, { Component } from "react";
import IconsBar from "./NotesIconBar";

export class DisplayNotes extends Component {
  // axios.getnotes(url)

  render() {
    return (
      <div>
        <div className="content-box">Hello World</div>
        <div className="bottom-bar">
          <IconsBar />
        </div>
      </div>
    );
  }
}

export default DisplayNotes;
