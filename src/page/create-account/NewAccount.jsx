import "./NewAccount.css";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: "",
      lName: "",
      userName: "",
      password: "",
      confirmPass: "",
      fNameError: false,
      lNameError: false,
      userNameError: false,
      passwordError: false,
      confirmPassError: false,
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validation = () => {
    let isError = false;
    const error = this.state;
    error.fNameError = this.state.fName === "" ? true : false;
    error.lNameError = this.state.lName === "" ? true : false;
    error.userNameError = this.state.userName === "" ? true : false;
    error.passwordError = this.state.password === "" ? true : false;
    error.confirmPassError = this.state.confirmPass === "" ? true : false;

    this.setState({
      ...error,
    });

    isError =
      error.fNameError ||
      error.lNameError ||
      error.userNameError ||
      error.passwordError ||
      error.confirmPassError;
    return isError;
  };

  onClicked = () => {
    var isValid = this.validation();
    if (isValid) {
      console.log("Validation failed");
    }
  };

  render() {
    return (
      <div className="outer-box">
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
                name="fName"
                error={this.state.fNameError}
                helperText={this.state.fNameError ? "Enter First Name" : ""}
                className="name-field"
                label="First Name"
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <TextField
                name="lName"
                error={this.state.lNameError}
                helperText={this.state.lNameError ? "Enter Last Name" : ""}
                className="name-field"
                label="Last Name"
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div>
              <TextField
                name="userName"
                error={this.state.userNameError}
                helperText={
                  this.state.userNameError
                    ? "Enter Username"
                    : "You can use letters, numbers and periods"
                }
                label="Username"
                className="username"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@gmail.com</InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div className="link-div">
              <a className="current-mail" href="#current-mail-link">
                Use my current email address instead
              </a>
            </div>
            <div className="password-div">
              <TextField
                name="password"
                error={this.state.passwordError}
                helperText={this.state.passwordError ? "Enter password" : ""}
                className="password-field"
                label="Password"
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
              />
              <TextField
                name="confirmPass"
                error={this.state.confirmPassError}
                helperText={
                  this.state.confirmPassError
                    ? "Enter confirmation password"
                    : ""
                }
                className="password-field"
                label="Confirm"
                variant="outlined"
                onChange={(e) => this.changeHandler(e)}
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.onClicked}
              >
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
