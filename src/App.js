import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/non-user/Login.js";
import Register from "./components/non-user/Register.js";

function App({ setRequiredHeaders }) {
  return (
    <div id="main">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login setRequiredHeaders={setRequiredHeaders} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
