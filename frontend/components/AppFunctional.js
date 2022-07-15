import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    switch (index) {
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
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${getXY().x}, ${getXY().y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (
      (direction === "up" && index === 0) ||
      (direction === "up" && index === 1) ||
      (direction === "up" && index === 2)
    ) {
      setMessage("You can't go up");
      return index;
    } else if (
      (direction === "left" && index === 0) ||
      (direction === "left" && index === 3) ||
      (direction === "left" && index === 6)
    ) {
      setMessage("You can't go left");
      return index;
    } else if (
      (direction === "down" && index === 6) ||
      (direction === "down" && index === 7) ||
      (direction === "down" && index === 8)
    ) {
      setMessage("You can't go down");
      return index;
    } else if (
      (direction === "right" && index === 2) ||
      (direction === "right" && index === 5) ||
      (direction === "right" && index === 8)
    ) {
      setMessage("You can't go right");
      return index;
    } else if (direction === "up") {
      setMessage(initialMessage);
      setSteps(steps + 1);
      return index - 3;
    } else if (direction === "left") {
      setMessage(initialMessage);
      setSteps(steps + 1);
      return index - 1;
    } else if (direction === "down") {
      setMessage(initialMessage);
      setSteps(steps + 1);
      return index + 3;
    } else if (direction === "right") {
      setMessage(initialMessage);
      setSteps(steps + 1);
      return index + 1;
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setIndex(getNextIndex(evt.target.id));
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: getXY().x,
        y: getXY().y,
        steps: steps,
        email: email,
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response.data.message));
    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps" data-testid="grid">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          data-testid="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit" data-testid="submit"></input>
      </form>
    </div>
  );
}
