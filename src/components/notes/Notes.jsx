import React, { Component } from "react";
import TakeANote from "../take-a-note/TakeANote";
import DisplayNotes from "../display-notes/DisplayNotes";
import NotesContext from "../context-files/NotesContext";
import UserServices from "../../services/userServices";
import "./Notes.css";

const services = new UserServices();

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      image: null,
    };
  }

  getNote = () => {
    services
      .GetNotesList()
      .then((res) => {
        var notes = res.data.data.data;
        // console.log(notes);
        this.filterNotes(notes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filterNotes = (notes) => {
    let reqNotes = notes.filter((note) => {
      if (note.isArchived !== true && note.isDeleted !== true) {
        return note;
      }
    });
    this.setState({
      notes: reqNotes.reverse(),
    });
  };

  componentDidMount() {
    this.getNote();
  }

  render() {
    return (
      <NotesContext.Provider
        value={{
          getNote: this.getNote,
          notes: this.state.notes,
        }}
      >
        <div>
          <div className="note-taker-div">
            <TakeANote />
          </div>
          <div className="cards-container">
            <DisplayNotes />
          </div>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default Notes;
