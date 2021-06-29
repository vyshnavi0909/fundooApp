import React, { Component } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import IconBar from "./NotesIconBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class TakeANote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
    };
  }

  handleOnClick = () => {
    this.setState({ showContent: true });
  };

  render() {
    return (
      <>
        <div
          className="take-a-note before-click"
          onClick={this.handleOnClick}
          style={{ display: this.state.showContent ? "none" : "flex" }}
        >
          <p>Take a note...</p>
          <div>
            <CheckBoxIcon className="add-note-icons" />
            <BrushIcon className="add-note-icons" />
            <PhotoIcon className="add-note-icons" />
          </div>
        </div>
        <div
          className="take-a-note after-click"
          style={{ display: this.state.showContent ? "flex" : "none" }}
          onClick={this.handleOnClick}
        >
          <TextField
            className="input"
            placeholder="Title"
            style={{ borderBottom: "none" }}
          />
          <TextField className="input" placeholder="Take a note" />
          <div className="iconBar-with-btn">
            <IconBar />
            <Button>close</Button>
          </div>
        </div>
      </>
    );
  }
}

export default TakeANote;
