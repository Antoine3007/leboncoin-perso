import React, { Component } from "react";
import axios from "axios";

class Offer extends Component {
  state = {
    //pictures: false,
    title: "",
    price: "",
    description: ""
  };
  render() {
    return (
      <div>
        <h2>Nom du produit : {this.state.title} </h2>
        <span>Description : {this.state.description}</span>
        <br />
        <br />
        <span>Prix : {this.state.price}</span>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id,
        {
          title: this.state.title,
          price: this.state.price,
          description: this.state.description
        },
        {
          headers: {
            authorization: "Bearer " + this.props.user.token
          }
        }
      )
      .then(response => {
        console.log("response.data", response.data);
        this.setState({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Offer;
