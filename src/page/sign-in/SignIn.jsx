import "./SignIn.css";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailId: "",
      mailError: false,
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
    error.mailError = this.state.mailId === "" ? true : false;

    this.setState({
      ...error,
    });

    isError = error.mailError;
    return isError;
  };

  onClicked = () => {
    var isNotValid = this.validation();
    if (isNotValid) {
      console.log("Validation failed");
    }
  };

  render() {
    return (
      <div className="sign-in-page">
        <form className="sign-in-form">
          <div className="fundoo-logo">
            <svg className="fundoo-logo" height="20" width="100">
              <text x="8" y="19" fill="blue">
                F
              </text>
              <text x="22" y="19" fill="red">
                u
              </text>
              <text x="36" y="19" fill="orange">
                n
              </text>
              <text x="51" y="19" fill="blue">
                d
              </text>
              <text x="66" y="19" fill="green">
                o
              </text>
              <text x="80" y="19" fill="red">
                o
              </text>
            </svg>
            <h3 className="sign-in-head">Sign in</h3>
            <p className="sign-in-tag">Use your Fundoo Account</p>
          </div>
          <TextField
            name="mailId"
            error={this.state.mailError}
            helperText={
              this.state.mailError ? "Enter your email or phone number" : ""
            }
            className="email-field"
            label="Email or phone"
            variant="outlined"
            onChange={(e) => this.changeHandler(e)}
          />
          <div className="middle-box">
            <a className="forgot-link" href="#forgot-email">
              Forgot email?
            </a>
            <p className="tag">
              Not your computer? Use Guest mode to sign in privately.
            </p>
            <a
              className="learn-more-link"
              href="https://support.google.com/chrome/answer/6130773?hl=en"
            >
              Learn more
            </a>
          </div>
          <div className="bottom-div">
            <Link className="create-acc" to="/">
              Create account
            </Link>
            <Button
              onClick={this.onClicked}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
