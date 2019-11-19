import React, { Component } from "react";
import "./App.css";
import gamePlay from "./components/GamePlay";
import winList from "./components/WinList";
import loseList from "./components/LoseList";
import appHeader from "./components/AppHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={gamePlay} />
        <Route component={winList} />
        <Route component={loseList} />
        <Route component={appHeader} />
      </Switch>
    </div>
  );
}

export default App;
