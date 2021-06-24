import './SignIn.css';
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="sign-in-page">
        <form className="sign-in-form">
          <div className="fundoo-logo">
            <svg className="fundoo-logo" height="20" width="100">
              <text x="6" y="19" fill="blue">
                F
              </text>
              <text x="17" y="19" fill="red">
                u
              </text>
              <text x="32" y="19" fill="orange">
                n
              </text>
              <text x="47" y="19" fill="blue">
                d
              </text>
              <text x="63" y="19" fill="green">
                o
              </text>
              <text x="79" y="19" fill="red">
                o
              </text>
            </svg>
            <h3 className="sign-in-head">Sign in</h3>
            <p className="sign-in-tag">Use your Fundoo Account</p>
          </div>
          <TextField
            required
            className="email-field"
            id="mail-phone"
            label="Email or phone"
            variant="outlined"
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
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
