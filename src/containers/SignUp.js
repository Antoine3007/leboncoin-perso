import React, { Component } from "react";
import axios from "axios";
import MyButton from "../components/MyButton";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    receiveOffers: false,
    acceptTerms: false,
    errorMessage: "",
    passwordIncorrect: false
  };

  handleChange = event => {
    console.log(event.target.name);
    const target = event.target;
    const name = target.name; // "email"

    // Utile si le formulaire contient des éléments "checkbox"
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value // utilise la valeur de la variable `name` en tant que clé
      // name: value // ca créer une clé qui s'appelle `name`
    });
  };

  onSubmit = event => {
    if (this.state.password === this.state.passwordConfirmation) {
      axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {
          // console.log(response.data);
          if (response.data && response.data.token) {
            this.props.logIn({
              token: response.data.token,
              username: response.data.account.username,
              _id: response.data._id
            });

            this.props.history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        errorMessage: "Les mots de passe doivent être identiques",
        passwordIncorrect: true
      });
    }

    event.preventDefault();
  };

  renderError() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="signup-form">
        <MyButton history={this.props.history} />

        <label htmlFor="email">Pseudo</label>
        <input
          id="username"
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              marginRight: 10
            }}
          >
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              className={
                this.state.passwordIncorrect === true ? "password-red" : ""
              }
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              marginLeft: 10
            }}
          >
            <label htmlFor="passwordConfirmation">
              Confirmer le mot de passe
            </label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="input-row">
          <input
            type="checkbox"
            id="receiveOffers"
            name="receiveOffers"
            value={this.state.receiveOffers}
            onChange={this.handleChange}
          />
          <label htmlFor="receiveOffers">Je souhaite recevoir des offres</label>
        </div>

        <div className="input-row">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            value={this.state.acceptTerms}
            onChange={this.handleChange}
          />
          <label htmlFor="acceptTerms">J'accepte les conditions</label>
        </div>

        {this.renderError()}

        <button type="submit">Valider</button>
      </form>
    );
  }
}

export default SignUp;
