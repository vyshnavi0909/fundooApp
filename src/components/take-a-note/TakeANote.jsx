import React, { Component } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import IconBar from "../icon-bar/IconBar";
import Button from "@material-ui/core/Button";
import "./TakeANote.css";
import { withGetNotes } from "../context-files/GetNotesContext";
import UserServices from "../../services/userServices";
const services = new UserServices();

export class TakeANote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
      newNote: "",
      noteTitle: "",
      isArchived: false,
      isDeleted: false,
      color: "",
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

  handleArchive = () => {
    this.setState({
      isArchived: true,
    });
  };

  addcolor = (e) => {
    this.setState({
      color: e.target.name,
    });
  };

  handleDelete = () => {
    this.setState({
      isDeleted: true,
    });
  };

  onClickClose = () => {
    console.log("close");
    this.setState({
      showContent: false,
    });

    let data = {
      title: this.state.noteTitle,
      description: this.state.newNote,
      color: this.state.color,
      isArchived: this.state.isArchived,
    };

    services
      .AddANote(data)
      .then((res) => {
        console.log(res);
        this.props.getNote();
        this.setState({
          color: "#ffffff",
          isArchived: false,
          isDeleted: false,
          newNote: "",
          noteTitle: "",
        });
      })
      .catch((err) => {
        console.log(err);
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
        <div
          className="after-click"
          style={{ backgroundColor: this.state.color }}
        >
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
            <IconBar
              color={this.addcolor}
              noteType="newNote"
              archive={this.handleArchive}
              // deleteNote={this.handleDelete}
            />
            <Button onClick={this.onClickClose}>close</Button>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="take-a-note" onClick={this.handleOnClick}>
          {onClickContent}
        </div>
      </>
    );
  }
}

export default withGetNotes(TakeANote);
