import React, { Component } from "react";
import IconsBar from "../icon-bar/IconBar";
import "./DisplayNotes.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withGetNotes } from "../context-files/GetNotesContext";

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const notesList = this.props.notes;
    var listItems = notesList.map((note, index) => (
      <div className="note-div" key={index}>
        <Card className="note-card" style={{ backgroundColor: note.color }}>
          <CardContent style={{ backgroundColor: note.color }}>
            <h4 style={{ backgroundColor: note.color }}>{note.title}</h4>
            <p style={{ backgroundColor: note.color }} className="notes-para">
              {note.description}
            </p>
          </CardContent>
          <div className="bottom-bar">
            <IconsBar
              res={note}
              noteType="updateNote"
              archive={this.props.archive}
            />
          </div>
        </Card>
      </div>
    ));

    return <div className="displaynotes">{listItems}</div>;
  }
}

export default withGetNotes(DisplayNotes);
