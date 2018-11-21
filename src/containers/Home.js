import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    collections: []
  };

  render() {
    const list = [];

    for (let i = 0; i < this.state.collections.length; i++) {
      const { title, description, price, _id } = this.state.collections[i];
      // equivaut à const title = this.state.collections[i].title;
      // equivaut à const description = this.state.collections[i].description;
      // equivaut à const price = this.state.collections[i].price;

      list.push(
        <Link to={"/offer/" + _id}>
          <div style={{ border: "1px solid black", height: "100px" }}>
            <div>{title}</div>
            <div>{description}</div>
            <div>{price}</div>
          </div>
        </Link>
      );
    }

    return <div>{list}</div>;
  }

  componentDidMount() {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer")
      .then(response => {
        //console.log("response.data", response.data);
        //console.log("this.state", this.state);
        this.setState({
          collections: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Home;
