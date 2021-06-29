import "./NewAccount.css";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import UserService from "../../services/userServices";

const services = new UserService();

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
      textType: "password",
    };
  }

  showPassword = () => {
    if (this.state.textType === "password") {
      this.setState({
        textType: "text",
      });
    } else {
      this.setState({
        textType: "password",
      });
    }
  };

  changeHandler = (e) => {
    if (e.target.name === "userName") {
      this.setState({
        [e.target.name]: e.target.value + "@gmail.com",
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
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

  onClicked = (e) => {
    e.preventDefault();

    var isValid = this.validation();
    if (isValid) {
      console.log("Validation failed");
    } else {
      if (this.state.password === this.state.confirmPass) {
        let data = {
          firstName: this.state.fName,
          lastName: this.state.lName,
          email: this.state.userName,
          service: "advance",
          password: this.state.password,
        };

        services
          .SignUp(data)
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data);
            this.props.history.push("/sign-in");
          })
          .catch((err) => {
            console.log("The error is:" + err);
          });
      } else {
        alert("password didn't match");
      }
    }
  };

  render() {
    return (
      <div className="outer-box">
        <form onSubmit={this.onClicked} className="form-box">
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
              <div className="name-field">
                <TextField
                  name="fName"
                  error={this.state.fNameError}
                  helperText={this.state.fNameError ? "Enter First Name" : ""}
                  label="First Name"
                  variant="outlined"
                  onChange={this.changeHandler}
                  fullWidth
                />
              </div>
              <div className="name-field">
                <TextField
                  name="lName"
                  error={this.state.lNameError}
                  helperText={this.state.lNameError ? "Enter Last Name" : ""}
                  label="Last Name"
                  variant="outlined"
                  onChange={this.changeHandler}
                  fullWidth
                />
              </div>
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
                onChange={this.changeHandler}
                fullWidth
              />
            </div>
            <div className="link-div">
              <a className="current-mail" href="#current-mail-link">
                Use my current email address instead
              </a>
            </div>
            <div className="password-div">
              <div className="password-field">
                <TextField
                  name="password"
                  type={this.state.textType}
                  error={this.state.passwordError}
                  helperText={this.state.passwordError ? "Enter password" : ""}
                  label="Password"
                  variant="outlined"
                  onChange={this.changeHandler}
                  fullWidth
                />
              </div>
              <div className="password-field">
                <TextField
                  name="confirmPass"
                  type={this.state.textType}
                  error={this.state.confirmPassError}
                  helperText={
                    this.state.confirmPassError
                      ? "Enter confirmation password"
                      : ""
                  }
                  label="Confirm"
                  variant="outlined"
                  onChange={this.changeHandler}
                  fullWidth
                />
              </div>
            </div>
            {this.state.password !== this.state.confirmPass ? (
              <FormHelperText error>Password no match</FormHelperText>
            ) : null}

            <FormHelperText>
              Use 8 or more characters with a mix of letters, numbers and
              symbols
            </FormHelperText>
            <div id="show-password">
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Show Password"
                onChange={this.showPassword}
              />
            </div>
            <div className="bottom-div">
              <Link className="sign-in-instead" to="/sign-in">
                Sign in instead
              </Link>
              <Button variant="contained" color="primary" type="submit">
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
