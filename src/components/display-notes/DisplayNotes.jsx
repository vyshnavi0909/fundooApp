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
  TextareaAutosize,
} from "@material-ui/core";

const services = new UserServices();

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      desc: "",
      noteID: "",
      fileName: "",
    };
  }

  handleImage = (filename) => {
    this.setState({
      fileName: filename,
    });
    console.log(this.state.fileName);
  };

  handleClickOpen = (note) => {
    this.setState({
      open: true,
      title: note.title,
      desc: note.description,
      noteID: note.id,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });

    let data = {
      noteId: this.state.noteID,
      title: this.state.title,
      description: this.state.description,
      file: this.state.fileName,
    };

    services
      .UpdateNotes(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
              <h4 className="note-textarea note-title" name="title">
                {note.title}
              </h4>
              <p className="notes-para note-textarea" name="desc">
                {note.description}
              </p>
            </CardContent>
          </div>
          <div className="bottom-bar">
            <IconsBar res={note} noteType="updateNote" />
          </div>
        </Card>
      </div>
    ));

    return (
      <div className="displaynotes">
        {listItems}
        <Dialog
          className="dialog-box"
          open={this.state.open}
          fullWidth
          aria-labelledby="responsive-dialog-title"
          style={{ backgroundColor: "none" }}
        >
          <DialogTitle id="responsive-dialog-title">
            <TextareaAutosize
              name="title"
              className="note-title"
              defaultValue={this.state.title}
              onChange={this.handleTitleChange}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextareaAutosize
                name="description"
                className="note-desc"
                defaultValue={this.state.desc}
                onChange={this.handleDescChange}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="bar-onclicked">
              <IconsBar noteType="updateNote" imageFunc={this.handleImage} />
              <Button onClick={this.handleClose}>close</Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withGetNotes(DisplayNotes);
