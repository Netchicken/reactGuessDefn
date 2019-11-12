import React, { Component } from "react";
import "./App.css";
import GamePlay from "./components/GamePlay";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GamePlay></GamePlay>
        </header>
      </div>
    );
  }
}

export default App;
