import React, { Component } from "react";
import TakeANote from "./TakeANote";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DisplayNotes from "./DisplayNotes";

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
