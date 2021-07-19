import React, { Component } from "react";
import IconsBar from "../icon-bar/IconBar";
import "./DisplayNotes.css";
import UserServices from "../../services/userServices";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withGetNotes } from "../context-files/Consumer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextareaAutosize,
  Popper,
  Paper,
  List,
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import deleteImg from "./delete.svg";

const services = new UserServices();

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorOpen: false,
      open: false,
      title: "",
      desc: "",
      id: "",
      image: "",
      collaborators: [],
      display: false,
      usersArray: [],
      openPopper: false,
      anchorEl: null,
    };
  }

  // methods to handle collaborator
  handleCollaborator = (note) => {
    this.setState({
      id: note.id,
      collaboratorOpen: true,
      collaborators: note.collaborators,
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
    let data = val;

    services
      .AddCollaborator(this.state.id, data)
      .then((res) => {
        console.log("collab-res", res);
      })
      .catch((err) => {
        console.log("collab", err);
      });
  };

  handleSave = () => {
    this.setState({
      collaboratorOpen: false,
      openPopper: false,
      anchorEl: null,
    });
    this.props.getNote();
  };

  close = () => {
    this.setState({
      collaboratorOpen: false,
    });
  };

  displayCollaborator = (collaborators) => {
    if (collaborators.length > 0) {
      let displayCol = [];
      for (let i = 0; i < collaborators.length; i++) {
        let firstLetter = collaborators[i].firstName.charAt(0).toUpperCase();
        displayCol.push(
          <span
            key={i}
            className="collab-profile"
            title={collaborators[i].email}
            style={{
              border: "3px solid #000",
              borderRadius: "100%",
              color: "#000",
              fontWeight: "bold",
              padding: "3px 9px",
              fontFamily: "serif",
            }}
          >
            {firstLetter}
          </span>
        );
      }
      return (
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
          {displayCol}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  removeCollab = (col) => {
    console.log("remove");
    let userid = col.userId;
    let id = this.state.id;
    services
      .RemoveCollaborator(id, userid)
      .then((res) => {
        console.log(res);
        this.props.getNote();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  collabsOnCollabBox = (collabs) => {
    if (collabs.length > 0) {
      let dis = [];
      for (let i = 0; i < collabs.length; i++) {
        dis.push(
          <div className="collabs-list">
            <div className="first">
              <AccountIcon fontSize="large" className="owner-icon" />
              <div>
                <div>
                  <b className="owner-name">
                    {collabs[i].firstName}
                    {collabs[i].lastName}
                  </b>
                </div>
                <p className="owner-tag">{collabs[i].email}</p>
              </div>
            </div>
            <div className="remove-btn">
              <img
                src={deleteImg}
                alt="collab-remove"
                onClick={this.removeCollab()}
              />
            </div>
          </div>
        );
      }
      return <div>{dis}</div>;
    } else {
      return <div></div>;
    }
  };

  // methods to handle color

  handleColor = (col) => {
    this.setState({
      color: col,
    });
  };

  // methods to handle image
  setImageUpdateNote = (content) => {
    this.setState({ image: content });
    this.handleClose();
  };

  displayImage = (img) => {
    let mainUrl = "http://fundoonotes.incubation.bridgelabz.com/";
    if (img !== undefined && img !== "") {
      let splitter = img.split("/");
      if (splitter.length > 2) {
        splitter.splice(0, 1);
        let image = mainUrl + splitter.join("/");
        return <img className="note-image" alt="imageUrl" src={image} />;
      } else {
        let image = mainUrl + img;
        return <img className="note-image" alt="imageUrl" src={image} />;
      }
    } else if (img === "") {
      return <div></div>;
    }
  };

  //methods to handle dialog box
  handleClickOpen = (note) => {
    this.setState({
      open: true,
      title: note.title,
      desc: note.description,
      id: note.id,
      color: note.color,
      image: note.imageUrl,
      collaborators: note.collaborators,
    });
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescChange = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  handleArchiveAndDelete = () => {
    this.setState({
      open: false,
    });
  };

  handleClose = () => {
    const data = new FormData();

    data.append("noteId", this.state.id);
    data.append("title", this.state.title);
    data.append("description", this.state.desc);
    if (this.state.image !== "") {
      data.append("file", this.state.image);
    }

    services
      .UpdateNotes(data)
      .then((res) => {
        console.log(res);
        this.props.getNote();
        this.setState({
          open: false,
          image: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //render method
  render() {
    const notesList = this.props.notes;

    var listItems = notesList.map((note, index) => (
      <div className="note-div" key={index}>
        <Card
          className="note-card"
          style={{ backgroundColor: note.color, borderRadius: "7px" }}
        >
          <div
            onClick={() => {
              this.handleClickOpen(note);
            }}
          >
            <CardContent className="card-content">
              {this.displayImage(note.imageUrl)}
              <p
                className="note-textarea note-title"
                style={{ fontWeight: "600", marginBottom: "10px" }}
                name="title"
              >
                {note.title}
              </p>
              <p className="notes-para note-textarea" name="desc">
                {note.description}
              </p>
              {this.displayCollaborator(note.collaborators)}
            </CardContent>
          </div>
          <div className="bottom-bar">
            <IconsBar
              note={note}
              noteType="updateNote"
              handleCollaborator={this.handleCollaborator}
              setImage={this.setImageUpdateNote}
            />
          </div>
        </Card>
      </div>
    ));

    const searchList = this.state.usersArray.map((val, ind) => {
      return (
        <List key={ind} onClick={() => this.handleAddUser(val)}>
          {val.email}
        </List>
      );
    });

    return (
      <div className="displaynotes">
        {listItems}

        {/* note - dialog box */}
        <Dialog
          className="dialog-box"
          open={this.state.open}
          fullWidth
          aria-labelledby="responsive-dialog-title"
          style={{
            backgroundColor: "none",
            zIndex: 2,
          }}
        >
          <DialogTitle
            id="responsive-dialog-title"
            className="dialog-text"
            style={{ backgroundColor: this.state.color }}
          >
            {this.displayImage(this.state.image)}
            <TextareaAutosize
              name="title"
              className="note-title"
              defaultValue={this.state.title}
              onChange={this.handleTitleChange}
            />
          </DialogTitle>
          <DialogContent style={{ backgroundColor: this.state.color }}>
            <DialogContentText style={{ backgroundColor: this.state.color }}>
              <TextareaAutosize
                name="description"
                className="note-desc"
                defaultValue={this.state.desc}
                onChange={this.handleDescChange}
              />
            </DialogContentText>
            {this.displayCollaborator(this.state.collaborators)}
          </DialogContent>
          <DialogActions style={{ backgroundColor: this.state.color }}>
            <div
              className="bar-onclicked"
              style={{ backgroundColor: this.state.color }}
            >
              <IconsBar
                noteType="updateNote"
                note={this.state}
                setImage={this.setImageUpdateNote}
                handleCollaborator={this.handleCollaborator}
                handleColor={this.handleColor}
                handleArchiveAndDelete={this.handleArchiveAndDelete}
              />
              <Button onClick={this.handleClose}>close</Button>
            </div>
          </DialogActions>
        </Dialog>

        {/* collaborator dialog box */}
        <Dialog
          className="collab-dialog-box"
          open={this.state.collaboratorOpen}
          fullWidth
          aria-labelledby="responsive-collab-dialog-title"
          style={{ backgroundColor: "none", zIndex: 2 }}
        >
          <DialogTitle id="responsive-collab-dialog-title">
            Collaborators
          </DialogTitle>
          <Divider light />
          <DialogContent>
            <div>
              <div className="first">
                <AccountIcon fontSize="large" className="owner-icon" />
                <div>
                  <div>
                    <b className="owner-name">Babbur Vyshnavi</b>
                    <span>(Owner)</span>
                  </div>
                  <p className="owner-tag">vyshu.goud1998@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="first">
              {this.collabsOnCollabBox(this.state.collaborators)}
            </div>
            <div className="second">
              <div className="collab-add-icon">
                <PersonAddIcon />
              </div>
              <input
                type="email"
                className="collab-input"
                placeholder="Person or email to share with"
                onChange={this.handleSearchChange}
                onMouseLeave={this.handleMouseLeave}
              />
            </div>
            <Popper
              open={this.state.openPopper}
              anchorEl={this.state.anchorEl}
              placement="bottom-start"
              transition
              style={{ zIndex: 20, marginTop: "450px", width: "250px" }}
            >
              <Paper
                className="collab-popper"
                style={{ padding: "10px", boxShadow: "1px 1px 5px #888" }}
              >
                {searchList}
              </Paper>
            </Popper>
          </DialogContent>
          <DialogActions className="collab-btns">
            <div>
              <button className="action-btn" onClick={this.close}>
                Cancel
              </button>
              <button className="action-btn" onClick={this.handleSave}>
                Save
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withGetNotes(DisplayNotes);
