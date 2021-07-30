import React, { Component } from "react";
import DisplayNotes from "../display-notes/DisplayNotes";
import UserServices from "../../services/userServices";

const services = new UserServices();

export class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  getArchiveNote = () => {
    services
      .GetArchiveNotesList()
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
    this.getArchiveNote();
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

export default Archive;
