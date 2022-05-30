import "./App.css";
import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/non-user/Login.js";
import Register from "./components/non-user/Register.js";

function App({setAccessToken, setClientToken, setExpiry, setUid}) {
  return (
    <div id="main">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login setAccessToken={setAccessToken} 
        setClientToken={setClientToken} 
        setExpiry={setExpiry} 
        setUid={setUid}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
