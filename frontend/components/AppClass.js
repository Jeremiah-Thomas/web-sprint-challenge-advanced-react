import e from "cors";
import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  state = initialState;

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch (this.state.index) {
      case 0:
        return { x: 1, y: 1 };

      case 1:
        return { x: 2, y: 1 };

      case 2:
        return { x: 3, y: 1 };

      case 3:
        return { x: 1, y: 2 };

      case 4:
        return { x: 2, y: 2 };

      case 5:
        return { x: 3, y: 2 };

      case 6:
        return { x: 1, y: 3 };

      case 7:
        return { x: 2, y: 3 };

      case 8:
        return { x: 3, y: 3 };
    }
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${this.getXY().x}, ${this.getXY().y})`;
  };

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (
      (direction === "up" && this.state.index === 0) ||
      (direction === "up" && this.state.index === 1) ||
      (direction === "up" && this.state.index === 2)
    ) {
      this.setState({ message: "You can't go up" });
      return this.state.index;
    } else if (
      (direction === "left" && this.state.index === 0) ||
      (direction === "left" && this.state.index === 3) ||
      (direction === "left" && this.state.index === 6)
    ) {
      this.setState({ message: "You can't go left" });
      return this.state.index;
    } else if (
      (direction === "down" && this.state.index === 6) ||
      (direction === "down" && this.state.index === 7) ||
      (direction === "down" && this.state.index === 8)
    ) {
      this.setState({ message: "You can't go down" });
      return this.state.index;
    } else if (
      (direction === "right" && this.state.index === 2) ||
      (direction === "right" && this.state.index === 5) ||
      (direction === "right" && this.state.index === 8)
    ) {
      this.setState({ message: "You can't go right" });
      return this.state.index;
    } else if (direction === "up") {
      this.setState({ message: initialMessage });
      this.setState({ steps: this.state.steps + 1 });
      return this.state.index - 3;
    } else if (direction === "left") {
      this.setState({ message: initialMessage });
      this.setState({ steps: this.state.steps + 1 });
      return this.state.index - 1;
    } else if (direction === "down") {
      this.setState({ message: initialMessage });
      this.setState({ steps: this.state.steps + 1 });
      return this.state.index + 3;
    } else if (direction === "right") {
      this.setState({ message: initialMessage });
      this.setState({ steps: this.state.steps + 1 });
      return this.state.index + 1;
    }
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.setState({ index: this.getNextIndex(evt.target.id) });
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({ email: evt.target.value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: this.getXY().x,
        y: this.getXY().y,
        steps: this.state.steps,
        email: this.state.email,
      })
      .then((res) => this.setState({ message: res.data.message }))
      .catch((err) => this.setState({ message: err.response.data.message }));
    this.setState({ email: initialEmail });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">
            You moved {this.state.steps}{" "}
            {this.state.steps === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
