import React, { Component } from "react";
import styles from "./CreateAccount.module.sass";
import { Paper, Button, TextField } from "@material-ui/core";
import CircleNavigation from "../../components/CircleNavigation/CircleNavigation";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { validateEmail, validatePassword } from "../../common/validation";
import { AUTH_KEY } from "../../config/auth";
import axios from "axios";
import moment from "moment";

class CreateAccount extends Component {
  state = {
    date: moment(new Date()).format("YYYY-MM-DD"),
    name: "",
    password: "",
    email: "",
    nameError: "",
    passwordError: "",
    emailError: "",
  };
  validationEmail = (e) => {
    if (e.target.value !== "") {
      if (validateEmail(e.target.value)) {
        this.setState({ zip: e.target.value });
        axios
          .post(
            "https://zieglerlabs-form-validator.herokuapp.com/check-email",
            {
              email: e.target.value,
            },
            {
              headers: {
                Authorization: AUTH_KEY,
              },
            }
          )
          .then((response) => {
            this.setState({
              email: e.target.value,
              emailError: !response.data.available ? "Email busy" : "",
            });
          });
      } else
        this.setState({ email: e.target.value, emailError: "Wrong email" });
    } else
      this.setState({ email: e.target.value, emailError: "Enter the email" });
  };

  validationName = (e) => {
    if (e.target.value !== "")
      this.setState({ name: e.target.value, nameError: "" });
    else this.setState({ name: e.target.value, nameError: "Enter the name" });
  };

  validationPassword = (e) => {
    if (e.target.value !== "") {
      if (validatePassword(e.target.value))
        this.setState({ password: e.target.value, passwordError: "" });
      else
        this.setState({
          password: e.target.value,
          passwordError:
            "The password should have a number of uppercase and lowercase letters and a special character",
        });
    } else
      this.setState({
        password: e.target.value,
        passwordError: "Enter the password",
      });
  };

  next = () => {
    const { password, name, email, date } = this.state;
    const data = {
      name,
      password,
      email,
      date,
    };
    this.props.changeComponent({
      showComponent: 1,
      data,
    });
  };
  dateChange = (e) => {
    this.setState({ date: e.target.value });
  };
  render() {
    const {
      nameError,
      emailError,
      passwordError,
      password,
      name,
      email,
      date,
    } = this.state;
    return (
      <Paper elevation={3} className={styles.container}>
        <CircleNavigation active={0} />
        <h3>Create your account</h3>
        <form className={styles.form} noValidate>
          <TextField
            onChange={(val) => this.validationName(val)}
            className={styles.input}
            id="name"
            label="Name"
            value={name}
            helperText={nameError}
            error={nameError !== ""}
            variant="outlined"
          />
          <TextField
            onChange={(val) => this.validationEmail(val)}
            className={styles.input}
            id="email"
            label="E-Mail"
            helperText={emailError}
            error={emailError !== ""}
            variant="outlined"
          />
          <TextField
            onChange={(val) => this.validationPassword(val)}
            helperText={passwordError}
            error={passwordError !== ""}
            className={styles.input}
            value={password}
            id="password"
            type="password"
            label="Password"
            variant="outlined"
          />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            variant="outlined"
            defaultValue={date}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Button
          variant="contained"
          className={styles.button}
          onClick={this.next}
          onChange={this.dateChange}
          size="medium"
          disabled={
            !(
              !nameError &&
              !emailError &&
              !passwordError &&
              email &&
              name &&
              password
            )
          }
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Paper>
    );
  }
}

export default CreateAccount;
