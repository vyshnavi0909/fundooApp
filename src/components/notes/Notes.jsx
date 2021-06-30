import React, { Component } from "react";
import TakeANote from "../take-a-note/TakeANote";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DisplayNotes from "../display-notes/DisplayNotes";
import "./Notes.css";

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconsDisplay: false,
    };
  }

  render() {
    return (
      <div>
        <div className="note-taker-div">
          <TakeANote />
        </div>
        <div className="cards-container">
          <Card className="note-card">
            <CardContent>
              <DisplayNotes />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Notes;
