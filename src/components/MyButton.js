import React from "react";

class MyButton extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          // this.props.history is not defined
          this.props.history.push("/");
        }}
        style={{ marginTop: 20 }}
      >
        Click here
      </button>
    );
  }
}

export default MyButton;
