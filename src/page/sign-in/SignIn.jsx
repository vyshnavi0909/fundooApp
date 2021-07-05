import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./SignIn.css";
import UserServices from "/home/babbur/Desktop/session3/React Projects/fundoo_app/src/services/userServices.js";
import Auth from "../../components/auth/Auth";
const services = new UserServices();

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailId: "",
      mailError: false,
      password: "",
      passwordError: false,
    };
  }

  componentDidMount() {
    document.title = "Fundoo Login";
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
    error.passwordError = this.state.password === "" ? true : false;

    this.setState({
      ...error,
    });

    isError = error.mailError || error.passwordError;
    return isError;
  };

  onClicked = () => {
    var isNotValid = this.validation();
    if (isNotValid) {
      console.log("Validation failed");
    } else {
      let data = {
        email: this.state.mailId,
        password: this.state.password,
      };

      services
        .SignIn(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.id);
          this.props.history.push("/dashboard");
        })
        .catch((err) => {
          console.log("The error is:" + err);
        });
    }
  };

  render() {
    return (
      <div className="signin-page">
        <form className="signin-form">
          <div className="signin-fundoo-logo">
            <svg className="signin-fundoo-logo" height="20" width="100">
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
            <h3 className="signin-head">Sign in</h3>
            <p className="signin-tag">Use your Fundoo Account</p>
          </div>

          <div className="signin-input-div">
            <TextField
              name="mailId"
              error={this.state.mailError}
              helperText={
                this.state.mailError ? "Enter your email or phone number" : ""
              }
              className="signin-email-field"
              label="Email or phone"
              variant="outlined"
              fullWidth="true"
              onChange={(e) => this.changeHandler(e)}
            />
          </div>
          <div className="signin-input-div">
            <Link className="forgot-link" to="/reset-email">
              Forgot email?
            </Link>
          </div>
          <div className="signin-input-div">
            <TextField
              name="password"
              type="password"
              error={this.state.passwordError}
              helperText={this.state.passwordError ? "Enter password" : ""}
              className="signin-email-field"
              label="password"
              variant="outlined"
              fullWidth="true"
              onChange={(e) => this.changeHandler(e)}
            />
          </div>

          <div className="signin-input-div">
            <Link className="forgot-link" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <div className="signin-middle-box">
            <p className="signin-note">
              Not your computer? Use Guest mode to sign in privately.
            </p>
            <a
              className="learn-more-link"
              href="https://support.google.com/chrome/answer/6130773?hl=en"
            >
              Learn more
            </a>
          </div>
          <div className="signin-bottom-div">
            <Link className="create-acc" to="/">
              Create account
            </Link>
            <Button
              // onClick={this.onClicked}
              onClick={() => {
                Auth.SignIn(() => {
                  this.props.history.push("/dashboard");
                });
              }}
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
