import React, { Component, createRef } from "react";
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
  Paper,
  Popper,
  TextareaAutosize,
  Fade,
  List,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

const services = new UserServices();
var collabValue;
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
      usersArray: [],
      openPopper: false,
      anchorEl: null,
    };
    this.inputRef = createRef();
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
    console.log(this.state.image);
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
      console.log(this.state.image);
      if (this.state.image !== "") {
        data.append("file", this.state.image);
      }
      if (this.state.color !== "") {
        data.append("color", this.state.color);
      }
      if (collabValue !== "") {
        data.append("collaberators", JSON.stringify([collabValue]));
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
            collaborators: [],
            display: false,
            usersArray: [],
          });
          collabValue = null;
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
    this.setState({
      openPopper: true,
      anchorEl: e.currentTarget,
    });
    let data = {
      searchWord: e.target.value,
    };
    services
      .SearchUserList(data)
      .then((res) => {
        this.setState({
          usersArray: res.data.data.details,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddUser = (val) => {
    collabValue = val;
    this.handleClose();
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

  searchingList = () => {
    const searchList = this.state.usersArray.map((val, ind) => {
      return (
        <List key={ind} onClick={() => this.handleAddUser(val)}>
          {val.email}
        </List>
      );
    });
    return searchList;
  };

  // handleOnBlur = () => {
  //   this.setState = {
  //     openPopper: false,
  //     anchorEl: null,
  //   };
  // };

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
                ref={this.inputRef}
                type="email"
                className="collab-input"
                placeholder="Person or email to share with"
                onChange={this.handleSearchChange}
              />
              <Popper
                open={this.state.openPopper}
                anchorEl={this.inputRef.current}
                placement="bottom-start"
                transition
                style={{
                  width: "20%",
                  marginTop: "270px ",
                }}
              >
                <Paper
                  style={{
                    padding: "20px",
                    boxShadow: "1px 1px 5px #888",
                  }}
                  className="collab-popper"
                >
                  {this.searchingList()}
                </Paper>
              </Popper>
            </div>
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
