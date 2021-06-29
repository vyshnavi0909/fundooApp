import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import Userservices from "/home/babbur/Desktop/session3/React Projects/fundoo_app/src/services/userServices.js";
const services = new Userservices();

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailId: "",
      emailError: false,
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
    error.emailError = this.state.email === "" ? true : false;

    this.setState({
      ...error,
    });

    isError = error.mailError;
    return isError;
  };

  onNext = () => {
    var isInvalid = this.validation();
    if (isInvalid) {
      console.log("Validation failed");
    } else {
      let data = {
        email: this.state.mailId,
      };

      services
        .Forgot(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data);
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log("The error:" + err);
        });
    }
  };

  render() {
    return (
      <div className="forgot-page">
        <form className="forgot-form">
          <div className="forgot-fundoo-logo">
            <svg className="forgot-fundoo-logo" height="20" width="100">
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
            <h3 className="forgot-head">Forgot Password</h3>
            <p className="forgot-tag">Enter your fundoo account mail id</p>
          </div>
          <TextField
            name="mailId"
            error={this.state.emailError}
            helperText={
              this.state.emailError ? "Enter your email or phone number" : ""
            }
            className="forgot-email-field"
            label="Email or phone"
            variant="outlined"
            fullWidth
            onChange={(e) => this.changeHandler(e)}
          />
          <div className="send-btn">
            <Button onClick={this.onNext} variant="contained" color="primary">
              Send
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
