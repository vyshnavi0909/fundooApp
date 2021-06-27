import "./ResetPassword.css";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import show from "./show.png";
import hide from "./hidden.png";
import UserServices from "/home/babbur/Desktop/session3/React Projects/fundoo_app/src/services/userServices.js";

const services = new UserServices();

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmpass: "",
      passwordError: false,
      confirmpassError: false,
      passtextType: "password",
      confPassTextType: "password",
      passIcon: hide,
      confIcon: hide,
    };
  }

  showPass = (e) => {
    if (e.target.name === "pass" && this.state.passIcon === hide) {
      this.setState({
        passtextType: "text",
        passIcon: show,
      });
    } else if (e.target.name === "pass" && this.state.passIcon === show) {
      this.setState({
        passtextType: "password",
        passIcon: hide,
      });
    } else if (e.target.name === "confirm" && this.state.confIcon === hide) {
      this.setState({
        confPassTextType: "text",
        confIcon: show,
      });
    } else {
      this.setState({
        confPassTextType: "password",
        confIcon: hide,
      });
    }
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validation = () => {
    let isError = false;
    const err = this.state;
    err.passwordError = this.state.password === "" ? true : false;
    err.confirmpassError = this.state.confirmpass === "" ? true : false;
    this.setState({
      ...err,
    });

    isError = err.passwordError || err.confirmpassError;
    return isError;
  };

  onReset = (e) => {
    e.preventDefault();

    var isInvalid = this.validation();
    if (isInvalid) {
      console.log("Validation failed");
    } else if (this.state.confirmpass === this.state.password) {
      let data = {
        newPassword: this.state.password,
      };

      services
        .Reset(data)
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
      <div className="reset-page">
        <form onSubmit={this.onReset} className="reset-form">
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
            <h3 className="head">Reset Password</h3>
            <p className="tag">Reset password of your fundoo account</p>
          </div>
          <div className="pass-div">
            <TextField
              name="password"
              type={this.state.passtextType}
              error={this.state.passwordError}
              helperText={this.state.passwordError ? "Enter password" : ""}
              className="pass-field"
              label="password"
              variant="outlined"
              onChange={this.changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      name="pass"
                      className="show-icon"
                      src={this.state.passIcon}
                      alt=""
                      onClick={this.showPass}
                    />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
          <div className="pass-div">
            <TextField
              name="confirmpass"
              type={this.state.confPassTextType}
              error={this.state.confirmpassError}
              helperText={
                this.state.confirmpassError ? "Enter Confirm password" : ""
              }
              className="pass-field"
              label="confirm password"
              variant="outlined"
              fullWidth
              onChange={this.changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      name="confirm"
                      className="show-icon"
                      src={this.state.confIcon}
                      alt=""
                      onClick={(e) => this.showPass(e)}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {this.state.password !== this.state.confirmpass ? (
            <FormHelperText error>Password no match</FormHelperText>
          ) : null}

          <div className="reset-btn">
            <Button type="submit" variant="contained" color="primary">
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
