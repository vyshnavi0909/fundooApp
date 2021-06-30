import React, { Component } from "react";
import IconsBar from "../icon-bar/IconBar";
import "./DisplayNotes.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {withGetNotes} from "../context-files/GetNotesContext";

export class DisplayNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconsDisplay: false,
    };
  }
  // static contextType = themeGetNotes;

  // componentDidMount() {
  //   const getnote = this.context;
  // }

  render() {
    const notesList = this.props.notes;
    var listItems = notesList.map((note, index) => 
        <div className="note-div" key={index}>
          <Card className="note-card" >
            <CardContent>
              <h4>{note.title}</h4>
              <p>{note.description}</p>
            </CardContent>
            <div className="bottom-bar">
            <IconsBar />
          </div>
          </Card>
          
        </div>
    )

    return (
      <div className="displaynotes">
            {listItems}
        </div>
    );
  }
}

// DisplayNotes.contextType = themeGetNotes;
export default withGetNotes(DisplayNotes);
