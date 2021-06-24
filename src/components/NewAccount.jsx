import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
                <text x="1" y="19" fill="blue">
                  F
                </text>
                <text x="13" y="19" fill="red">
                  u
                </text>
                <text x="26" y="19" fill="orange">
                  n
                </text>
                <text x="40" y="19" fill="blue">
                  d
                </text>
                <text x="54" y="19" fill="green">
                  o
                </text>
                <text x="68" y="19" fill="red">
                  o
                </text>
              </svg>
              <p className="form-heading">Create your Fundoo Account</p>
            </div>
            <div className="name-div">
              <TextField
                required
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
                required
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
                required
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
              <Link className="sign-in-instead" to="/sign-in">
                Sign in instead
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </div>
          </div>
          <div className="img-box">
            <img
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              width="244"
              height="244"
              alt="fundoo"
            />
            <p>One account. All of Fundoo working for you.</p>
          </div>
        </form>
      </div>
    );
  }
}

export default NewAccount;
