import React, { Component } from "react";
import TakeANote from "../take-a-note/TakeANote";
import DisplayNotes from "../display-notes/DisplayNotes";
import GetNotesContext from "../context-files/GetNotesContext";
import UserServices from "../../services/userServices";
import "./Notes.css";

const services = new UserServices();

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  getNote = () => {
    services
      .GetNotesList()
      .then((res) => {
        console.log(res.data.data.data);
        var note = res.data.data.data;
        this.setState({
          notes: note,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getNote();
  }

  render() {
    return (
      <GetNotesContext.Provider value={{
        getNote: this.getNote,
        notes : this.state.notes
      }}>
        <div>
          <div className="note-taker-div">
            <TakeANote />
          </div>
          <div className="cards-container">
            <DisplayNotes  />
          </div>
        </div>
      </GetNotesContext.Provider>
    );
  }
}

export default Notes;
