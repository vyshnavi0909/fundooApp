import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import { withGetNotes } from "../context-files/Consumer";
import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import UserServices from "../../services/userServices";
import "./IconBar.css";

const services = new UserServices();

export class NotesIconBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openColor: false,
      anchorEl: null,
      color: "#ffffff",
      openOptions: false,
      image: null,
    };
    this.myRef = React.createRef();
  }

  handleCollaborator = () => {
    if (this.props.noteType === "newNote") {
      this.props.collab();
    } else if (this.props.noteType === "updateNote") {
      this.props.handleCollaborator();
    }
  };

  handleColorPalette = (e) => {
    this.setState({
      openColor: !this.state.openColor,
      anchorEl: e.currentTarget,
      openOptions: false,
    });
  };

  handleChangeColor = (e) => {
    if (this.props.noteType === "updateNote") {
      let data = {
        noteIdList: [this.props.note.id],
        color: e.target.name,
      };
      services
        .ChangeColor(data)
        .then((res) => {
          console.log(res);
          this.props.getNote();
          this.props.handleColor(data.color);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.props.noteType === "newNote") {
      this.props.color(e.target.name);
    }
  };

  handleImage = (e) => {
    if (this.props.noteType === "updateNote") {
      console.log(e.target.files[0]);
      this.props.setImage(e.target.files[0].name);
    } else if (this.props.noteType === "newNote") {
      this.props.setImage(e);
    }
  };

  onArchive = () => {
    if (this.props.noteType === "updateNote") {
      let data = {
        isArchived: true,
        noteIdList: [this.props.note.id],
      };

      services
        .ArchiveNote(data)
        .then((res) => {
          this.props.getNote();
          this.props.handleArchiveAndDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.props.noteType === "newNote") {
      this.props.archiveFunc();
    }
  };

  handleBlur = () => {
    this.setState({
      openColor: false,
      anchorEl: null,
      openOptions: false,
    });
  };

  moreOptions = (e) => {
    this.setState({
      openOptions: !this.state.openOptions,
      openColor: false,
      anchorEl: e.currentTarget,
    });
  };

  onDelete = (e) => {
    if (this.props.noteType === "updateNote") {
      let data = {
        noteIdList: [this.props.note.id],
        isDeleted: true,
      };

      services
        .DeleteNote(data)
        .then((res) => {
          this.props.getNote();
          this.props.handleArchiveAndDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="icons-div" onMouseLeave={this.handleBlur}>
        <Popper
          name="colorPopper"
          open={this.state.openColor}
          anchorEl={this.state.anchorEl}
          placement="top"
          transition
          style={{ zIndex: 10 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <div className="color-palette">
                  <button
                    onClick={this.handleChangeColor}
                    title="Default"
                    name="#ffffff"
                    className="color color-1"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Red"
                    name="#f28b82"
                    className="color color-2"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Orange"
                    name="#fbbc04"
                    className="color color-3"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Yellow"
                    name="#fff475"
                    className="color color-4"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Green"
                    name="#ccff90"
                    className="color color-5"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Teal"
                    name="#a7ffeb"
                    className="color color-6"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Blue"
                    name="#cbf0f8"
                    className="color color-7"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Dark Blue"
                    name="#aecbfa"
                    className="color color-8"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Purple"
                    name="#d7aefb"
                    className="color color-9"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Pink"
                    name="#fdcfe8"
                    className="color color-10"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Brown"
                    name="#e6c9a8"
                    className="color color-11"
                  ></button>
                  <button
                    onClick={this.handleChangeColor}
                    title="Grey"
                    name="#e8eaed"
                    className="color color-12"
                  ></button>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Popper
          name="more"
          open={this.state.openOptions}
          anchorEl={this.state.anchorEl}
          placement="bottom-start"
          transition
          style={{ zIndex: 10 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="optionsPaper">
                <div className="moreOptions">
                  <ul>
                    <li
                      onClick={this.onDelete}
                      title="Delete note"
                      name="delete"
                      className="options delete-opt"
                    >
                      Delete note
                    </li>
                    <li
                      onClick={this.selectedOption}
                      title="Add label"
                      name="addLabel"
                      className="options addLabl-opt"
                    >
                      Add label
                    </li>
                    <li
                      onClick={this.selectedOption}
                      title="Add drawing"
                      name="addDrwaing"
                      className="options addDraw-opt"
                    >
                      Add Drawing
                    </li>
                    <li
                      onClick={this.selectedOption}
                      title="Make a copy"
                      name="makeCopy"
                      className="options copy-opt"
                    >
                      Make a copy
                    </li>
                    <li
                      onClick={this.selectedOption}
                      title="Show checkboxes"
                      name="showCheckbox"
                      className="options showCheckbox-opt"
                    >
                      Show checkboxes
                    </li>
                    <li
                      onClick={this.selectedOption}
                      title="Copy to Google Docs"
                      name="copyToDocs"
                      className="options copyDocs-opt"
                    >
                      Copy to Google Docs
                    </li>
                  </ul>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>

        <AddAlertIcon title="Remind me" className="bar-icon" />

        <CollaboratorIcon
          title="Collaborator"
          className="bar-icon"
          onClick={this.handleCollaborator}
        />

        <ColorLensIcon
          title="Change color"
          className="bar-icon"
          onMouseEnter={this.handleColorPalette}
        />

        <label htmlFor="file">
          <PhotoIcon title="Add image" className="bar-icon" />
        </label>
        <input
          id="file"
          type="file"
          className="file-input"
          onChange={this.handleImage}
        />

        <ArchiveIcon
          title="Archive"
          className="bar-icon"
          onClick={this.onArchive}
        />
        <MoreIcon
          title="More"
          className="bar-icon"
          onClick={this.moreOptions}
          // onMouseLeave={this.handleBlur}
        />
      </div>
    );
  }
}

export default withGetNotes(NotesIconBar);
