import React, { Component, Fragment } from "react";
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
    };
  }

  // handleClickOpen = (res, index) => {
  //   this.setState({
  //     open: true,
  //     title: res.title,
  //     desc: res.description,
  //     noteID: index,
  //   });
  // };

  handleClose = () => {
    this.setState({
      open: false,
      // noteID: ,
    });

    let data = {
      noteIdList: this.state.noteID,
      title: this.state.title,
      description: this.state.description,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handleTitleChange = (e) => {
  //   this.setState({
  //     title: e.target.value,
  //   });
  //   let data = {
  //     noteIdList: note.id,
  //     title: this.state.title,
  //   };
  // };

  // handleDescChange = (e) => {
  //   this.setState({
  //     desc: e.target.value,
  //   });
  // };

  render() {
    const notesList = this.props.notes;
    var listItems = notesList.map((note, index) => (
      <div className="note-div" key={index}>
        <Card className="note-card" style={{ backgroundColor: note.color }}>
          <div key={index}>
            <CardContent className="card-content">
              <TextareaAutosize
                // style={{ textTransform: "capitalize" }}
                className="note-textarea note-title"
                name="title"
                onChange={this.handleChange}
              >
                {note.title}
              </TextareaAutosize>
              <TextareaAutosize
                className="notes-para note-textarea"
                name="desc"
                onChange={this.handleChange}
              >
                {note.description}
              </TextareaAutosize>
            </CardContent>
          </div>
          <div className="bottom-bar">
            <IconsBar
              res={note}
              noteType="updateNote"
              archive={this.props.archive}
            />
            <Button onClick={this.handleClose}>close</Button>
          </div>
        </Card>

        {/* <div className="note-div" key={index}>
          <Card className="note-card" style={{ backgroundColor: note.color }}>
            <Button
              className="display-notes-btn"
              style={{ textTransform: "capitalize" }}
              onClick={this.handleClickOpen}
              key={index}
            >
              <CardContent>
                <h4>{note.title}</h4>
                <p className="notes-para">{note.description}</p>
              </CardContent>
            </Button>

            <div className="bottom-bar">
              <IconsBar
                res={note}
                noteType="updateNote"
                archive={this.props.archive}
              />
            </div>
          </Card>
        </div> */}
        {/* <Dialog
          className="dialog-box"
          open={this.state.open}
          fullWidth
          aria-labelledby="responsive-dialog-title"
          style={{ backgroundColor: "none" }}
          onClose={this.handleClose}
        >
          <DialogTitle id="responsive-dialog-title">
            <TextareaAutosize
              name="title"
              className="note-title"
              defaultValue={note.title}
              onChange={this.handleTitleChange}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextareaAutosize
                name="description"
                className="note-desc"
                defaultValue={note.description}
                onChange={this.handleDescChange}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="bar-onclicked">
              <IconsBar
              // res={this.state.noteid}
              // noteType="updateNote"
              // archive={this.props.archive}
              />
              <Button onClick={this.handleClose}>close</Button>
            </div>
          </DialogActions>
        </Dialog> */}
      </div>
    ));

    return <div className="displaynotes">{listItems}</div>;
  }
}

export default withGetNotes(DisplayNotes);
