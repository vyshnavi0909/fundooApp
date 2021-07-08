import React, { Component } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import IconBar from "../icon-bar/IconBar";
import Button from "@material-ui/core/Button";
import "./TakeANote.css";
import { withGetNotes } from "../context-files/Consumer";
import UserServices from "../../services/userServices";
import { TextareaAutosize } from "@material-ui/core";
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
      image: "",
    };
  }

  setImage = (e) => {
    this.setState({
      image: e.target.files[0].name,
    });
  };

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
      showContent: false,
    });
    let data = {
      title: this.state.noteTitle,
      description: this.state.newNote,
      color: this.state.color,
      isArchived: true,
    };

    services
      .AddANote(data)
      .then((res) => {
        console.log(res);
        console.log(data.isArchived);
        this.props.getNote();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addcolor = (e) => {
    this.setState({
      color: e,
    });
  };

  handleDelete = () => {
    this.setState({
      isDeleted: true,
    });
  };

  handleClose = () => {
    if (this.state.title !== "") {
      const data = new FormData();
      data.append("title", this.state.noteTitle);
      data.append("description", this.state.newNote);
      data.append("color", this.state.color);
      data.append("isArchived", this.state.isArchived);
      data.append("file", this.state.image);
      services
        .AddANote(data)
        .then((res) => {
          console.log(res);
          this.props.getNote();
          this.setState({
            showContent: false,
            newNote: "",
            noteTitle: "",
            isArchived: false,
            isDeleted: false,
            color: "",
            image: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  collabDialog = () => {};

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
          <TextareaAutosize
            className="note-input"
            name="noteTitle"
            placeholder="Title"
            onChange={this.handleChange}
          />
          <TextareaAutosize
            className="note-input"
            name="newNote"
            placeholder="Take a note"
            onChange={this.handleChange}
          />
          <div className="iconBar-with-btn">
            <IconBar
              color={this.addcolor}
              noteType="newNote"
              archiveFunc={this.handleArchive}
              setImage={this.setImage}
              collab={this.collabDialog}
            />
            <Button onClick={this.handleClose}>close</Button>
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
