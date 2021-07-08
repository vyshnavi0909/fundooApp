import React, { Component } from "react";
import UserServices from "../../services/userServices";
import DisplayNotes from "../display-notes/DisplayNotes";

const services = new UserServices();

export class Trash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  getTrashNotes = () => {
    services
      .GetTrashNotesList()
      .then((res) => {
        var reqnotes = res.data.data.data;

        var noteArr = reqnotes.reverse();
        this.setState({
          notes: noteArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTrashNotes();
  }

  render() {
    return (
      <div>
        <div className="cards-container">
          <DisplayNotes notes={this.state.notes} />
        </div>
      </div>
    );
  }
}

export default Trash;
