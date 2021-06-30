import React, { Component } from "react";
import Popper from '@material-ui/core/Popper';

import AddAlertIcon from "@material-ui/icons/AddAlertOutlined";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import PhotoIcon from "@material-ui/icons/PhotoOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import "./IconBar.css"
export class NotesIconBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open: false,
       anchorEl: null,
    }
  }

  handleClick = (e) => {
    this.setState({
      open : !this.state.open,
      anchorEl : e.currentTarget,
      color : "#ffffff"
    })
  }

  onButtonClick = (e) => {
    this.setState ({
      color : e.target.name
    })

  }
  
  render() {
    return (
      <div className="icons-div">
        <Popper open={this.state.open} anchorEl={this.state.anchorEl} placement="top" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Paper>
              <div className="color-palette">
                <button onClick={this.onButtonClick} title="Default" name="#ffffff" className="color color-1" ></button>
                <button onClick={this.onButtonClick} title="Red" name="#f28b82" className="color color-2"></button>
                <button onClick={this.onButtonClick} title="Orange" name="#fbbc04" className="color color-3"></button>
                <button onClick={this.onButtonClick} title="Yellow" name="#fff475" className="color color-4"></button>
                <button onClick={this.onButtonClick} title="Green" name="#ccff90" className="color color-5"></button>
                <button onClick={this.onButtonClick} title="Teal" name="#a7ffeb" className="color color-6"></button>
                <button onClick={this.onButtonClick} title="Blue" name="#cbf0f8" className="color color-7"></button>
                <button onClick={this.onButtonClick} title="Dark Blue" name="#aecbfa" className="color color-8"></button>
                <button onClick={this.onButtonClick} title="Purple" name="#d7aefb" className="color color-9"></button>
                <button onClick={this.onButtonClick} title="Pink" name="#fdcfe8" className="color color-10"></button>
                <button onClick={this.onButtonClick} title="Brown" name="#e6c9a8" className="color color-11"></button>
                <button onClick={this.onButtonClick} title="Grey" name="#e8eaed" className="color color-12"></button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
        <AddAlertIcon title="Remind me" className="bar-icon" />
        <CollaboratorIcon title="Collaborator" className="bar-icon" />
        <ColorLensIcon title="Change color" className="bar-icon"  onClick={this.handleClick}/>
        <PhotoIcon title="Add image" className="bar-icon" />
        <ArchiveIcon title="Archive" className="bar-icon" />
        <MoreIcon title="More" className="bar-icon" />
      </div>
    );
  }
}

export default NotesIconBar;
