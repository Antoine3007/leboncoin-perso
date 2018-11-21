import React, { Component } from "react";
import axios from "axios";

class Publish extends Component {
  state = {
    title: "",
    description: "",
    price: ""
  };

  handleChange = event => {
    //console.log(event.target.name);
    const target = event.target;
    const name = target.name; // "email"

    // const value = target.value;

    this.setState({
      [name]: target.value // utilise la valeur de la variable `name` en tant que clé
      // name: value // ca créer une clé qui s'appelle `name`
    });
  };

  onSubmit = event => {
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price
        },
        {
          headers: {
            authorization: `Bearer ${this.props.user.token}`
          }
        }
      )
      .then(response => {
        console.log("response.data", response.data);
        this.setState({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price
        });
      })
      .catch(err => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="publish-form">
        <label htmlFor="title">Titre de l'annnonce</label>
        <input
          id="title"
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <label htmlFor="description">Texte de l'annonce</label>
        <textarea
          id="description"
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <label htmlFor="price">Prix</label>
        <input
          id="price"
          name="price"
          type="text"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <button type="submit" className="submit-publish">
          Valider
        </button>
      </form>
    );
  }
}

export default Publish;
