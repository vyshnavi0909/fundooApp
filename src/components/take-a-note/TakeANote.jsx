import React, { Component } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushIcon from "@material-ui/icons/BrushOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import IconBar from "../icon-bar/IconBar";
import Button from "@material-ui/core/Button";
import "./TakeANote.css";
import { withGetNotes } from "../context-files/Consumer";
import UserServices from "../../services/userServices";
import {
  Divider,
  MenuItem,
  MenuList,
  TextareaAutosize,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
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
      collabOpen: false,
      collaborators: "",
      display: false,
      collabData: {
        filter: "",
        usersArray: [],
      },
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
    let data = new FormData();
    data.append("title", this.state.noteTitle);
    data.append("description", this.state.newNote);
    data.append("color", this.state.color);
    data.append("isArchived", true);
    if (this.state.collaborators !== "") {
      data.append("collaborators", this.state.collaborators);
    }
    if (this.state.image !== "") {
      data.append("file", this.state.image);
    }

    services
      .AddANote(data)
      .then((res) => {
        console.log(res);
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
      console.log(this.state.image);
      if (this.state.image !== "") {
        data.append("file", this.state.image);
      }
      if (this.state.collaborators !== "") {
        data.append("collaborators", this.state.collaborators);
      }

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
            collabOpen: false,
            collaborators: "",
            display: false,
            collabData: {
              filter: "",
              usersArray: [],
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  collabDialog = () => {
    this.setState({
      collabOpen: true,
    });
  };

  handleSearchChange = (e) => {
    console.log(this.state);
    this.setState({
      collabData: {
        ...this.state.collabData,
        filter: e.target.value,
      },
    });

    console.log(this.state.collabData.filter);
    let data = {
      searchWord: e.target.value,
    };
    services
      .SearchUserList(data)
      .then((res) => {
        this.setState({
          collabData: {
            ...this.state.collabData,
            usersArray: res.data.data.details,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddUser = (val) => {
    console.log("add", this.state);
    this.setState({
      collaborators: val,
    });
  };

  onSave = () => {
    console.log("save", this.state);

    this.setState({
      collabOpen: false,
    });
  };

  onCancel = () => {
    console.log("cancel", this.state);

    this.setState({
      collabOpen: false,
      collaborators: "",
    });
  };

  render() {
    const searchList = this.state.collabData.usersArray.map((val, ind) => {
      return (
        <MenuItem key={ind} onClick={this.handleAddUser(val)}>
          {val.email}
        </MenuItem>
      );
    });

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
    } else if (clicked && !this.state.collabOpen) {
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
    } else if (clicked && this.state.collabOpen) {
      onClickContent = (
        <div>
          <div className="new-note-collab">
            <h3 className="collab-title"> Collaborators</h3>
            <Divider light />
            <div>
              <div className="new-first">
                <AccountIcon fontSize="large" className="owner-icon" />
                <div>
                  <div>
                    <b className="owner-name">Babbur Vyshnavi</b>
                    <span>
                      <em style={{ fontSize: "11px" }}>(Owner)</em>
                    </span>
                  </div>
                  <p className="owner-tag">vyshu.goud1998@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="new-second">
              <div className="add-new-colab-icon">
                <PersonAddIcon />
              </div>
              <input
                type="email"
                className="collab-input"
                placeholder="Person or email to share with"
                onChange={this.handleSearchChange}
              />
            </div>
            <MenuList>{searchList}</MenuList>
          </div>
          <div className="new-collab-btns">
            <div>
              <button className="cancel-btn" onClick={this.onCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={this.onSave}>
                Save
              </button>
            </div>
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
