import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <form className="form-box">
          <div className="first-box">
            <div>
              <svg className="fundoo-logo" height="20" width="100">
                <text x="2" y="15" fill="blue">
                  F
                </text>
                <text x="10" y="15" fill="red">
                  U
                </text>
                <text x="20" y="15" fill="orange">
                  N
                </text>
                <text x="30" y="15" fill="blue">
                  D
                </text>
                <text x="40" y="15" fill="green">
                  O
                </text>
                <text x="51" y="15" fill="red">
                  O
                </text>
              </svg>
              <p className="form-heading">Create your Fundoo Account</p>
            </div>
            <div className="name-div">
              <TextField
                id="firstName"
                className="name-field"
                label="First Name"
                variant="outlined"
              />
              <TextField
                id="lastName"
                className="name-field"
                label="Last Name"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Username"
                className="username"
                id="userName"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@gmail.com</InputAdornment>
                  ),
                }}
                variant="outlined"
                helperText="You can use letters, numbers and periods"
              />
            </div>
            <div className="link-div">
              <a className="current-mail" href="#current-mail-link">
                Use my current email address instead
              </a>
            </div>
            <div className="password-div">
              <TextField
                id="password"
                className="password-field"
                label="Password"
                variant="outlined"
              />
              <TextField
                id="confirm-password"
                className="password-field"
                label="Confirm"
                variant="outlined"
              />
            </div>
            <FormHelperText>
              Use 8 or more characters with a mix of letters, numbers and
              symbols
            </FormHelperText>
            <div id="show-password">
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Show Password"
              />
            </div>
            <div className="bottom-div">
              <a className="sign-in-instead" href="#sign-in-link">
                Sign in instead
              </a>
              <Button variant="contained" color="primary">
                Primary
              </Button>
            </div>
          </div>
          {/* <div></div> */}
        </form>
      </div>
    );
  }
}

export default NewAccount;
