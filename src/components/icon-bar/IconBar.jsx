import React, { Component } from "react";

import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import "./IconBar.css"
export class NotesIconBar extends Component {
  render() {
    return (
      <div className="icons-div">
        <AddAlertIcon className="bar-icon" />
        <CollaboratorIcon className="bar-icon" />
        <ColorLensIcon className="bar-icon" />
        <PhotoIcon className="bar-icon" />
        <ArchiveIcon className="bar-icon" />
        <MoreIcon className="bar-icon" />
      </div>
    );
  }
}

export default NotesIconBar;
