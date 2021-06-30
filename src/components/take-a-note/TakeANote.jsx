import React, { Component } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import IconBar from "../icon-bar/IconBar";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./TakeANote.css";
import UserServices from "../../services/userServices";
const services = new UserServices();

export class TakeANote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
      newNote: "",
      noteTitle: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnClick = () => {
    if (!this.state.showContent) {
      this.setState({ showContent: true });
    }
  };

  onClickClose = () => {
    console.log("close");
    this.setState({
      showContent: false,
    });

    let data = {
      title: this.state.noteTitle,
      description: this.state.newNote,
    };

    services
      .AddANote(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    services
      .GetANote()
      .then((res) => {
        console.log(res);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  render() {
    const clicked = this.state.showContent;
    let onClickContent;
    if (!clicked) {
      onClickContent = (
        <div className="before-click">
          <p>Take a note...</p>
          <div className="add-icons">
            <CheckBoxIcon className="add-note-icons" />
            <BrushIcon className="add-note-icons" />
            <PhotoIcon className="add-note-icons" />
          </div>
        </div>
      );
    } else {
      onClickContent = (
        <div className="after-click">
          <input
            className="note-input"
            name="noteTitle"
            placeholder="Title"
            onChange={this.handleChange}
          />
          <input
            className="note-input"
            name="newNote"
            placeholder="Take a note"
            onChange={this.handleChange}
          />
          <div className="iconBar-with-btn">
            <IconBar />
            <Button onClick={this.onClickClose}>close</Button>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="take-a-note " onClick={this.handleOnClick}>
          {onClickContent}
        </div>
      </>
    );
  }
}

export default TakeANote;
