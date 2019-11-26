import React, { Component } from "react";
import "./App.css";
import gamePlay from "./components/GamePlay";
import winList from "./components/WinList";
import loseList from "./components/LoseList";
import qCards from "./components/QCards";
import appHeader from "./components/AppHeader";
import winLose from "./components/WinLose";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Switch } from "react-router-dom";
//https://levelup.gitconnected.com/deploying-a-create-react-app-with-routing-to-github-pages-f386b6ce84c2
function App() {
  return (
    <HashRouter basename="/">
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={gamePlay} />
          <Route component={winList} />
          <Route component={loseList} />
          <Route component={appHeader} />
          <Route component={qCards} />
          <Route component={winLose} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
