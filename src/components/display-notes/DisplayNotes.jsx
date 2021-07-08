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
} from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
const services = new UserServices();

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorOpen: false,
      open: false,
      title: "",
      desc: "",
      noteID: "",
      image: null,
    };
  }

  handleClickOpen = (note) => {
    this.setState({
      open: true,
      title: note.title,
      desc: note.description,
      noteID: note.id,
      color: note.color,
      image: note.imageUrl,
    });
  };

  close = () => {
    this.setState({
      collaboratorOpen: false,
    });
  };

  handleCollaborator = () => {
    this.setState({
      collaboratorOpen: true,
    });
  };

  handleClose = () => {
    const data = new FormData();
    data.append("noteId", this.state.noteID);
    data.append("title", this.state.title);
    data.append("description", this.state.desc);
    if (this.state.image !== null) {
      data.append("file", this.state.image);
    }
    console.log(data);
    services
      .UpdateNotes(data)
      .then((res) => {
        console.log(res);
        this.props.getNote();
        this.setState({
          open: false,
        });
      })
      .catch((err) => {
        console.log(err);
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

  setImageUpdateNote = (content) => {
    this.setState({ image: content });
  };

  displayImage = (image) => {
    console.log(image);
    if (image !== "") {
      return <img alt="imageUrl" src={image} />;
    }
  };

  render() {
    const notesList = this.props.notes;
    var listItems = notesList.map((note, index) => (
      <div className="note-div" key={index}>
        <Card className="note-card" style={{ backgroundColor: note.color }}>
          <div
            onClick={() => {
              this.handleClickOpen(note);
            }}
          >
            <CardContent className="card-content">
              {/* <img className="note-image" alt="" src={note.imageUrl} /> */}
              <p className="note-textarea note-title" name="title">
                {note.title}
              </p>
              <p className="notes-para note-textarea" name="desc">
                {note.description}
              </p>
              {this.displayImage(note.imageUrl)}
            </CardContent>
          </div>
          <div className="bottom-bar">
            <IconsBar
              res={note}
              noteType="updateNote"
              handleCollaborator={this.handleCollaborator}
              setImage={this.setImageUpdateNote}
            />
          </div>
        </Card>
      </div>
    ));

    return (
      <div className="displaynotes">
        {listItems}

        {/* note - dialog box */}

        <Dialog
          className="dialog-box"
          open={this.state.open}
          fullWidth
          aria-labelledby="responsive-dialog-title"
          style={{ backgroundColor: "none" }}
        >
          <DialogTitle
            id="responsive-dialog-title"
            style={{ backgroundColor: this.state.color }}
          >
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
              {this.displayImage(this.state.image)}
            </DialogContentText>
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
          style={{ backgroundColor: "none" }}
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
            <div className="second">
              <div className="collab-add-icon">
                <PersonAddIcon />
              </div>
              <input
                type="email"
                className="collab-input"
                placeholder="Person or email to share with"
              />
            </div>
          </DialogContent>
          <DialogActions className="collab-btns">
            <div>
              <button className="action-btn" onClick={this.close}>
                Cancel
              </button>
              <button className="action-btn">Save</button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withGetNotes(DisplayNotes);
