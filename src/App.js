import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

const Dashboard = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Dashboard</h2>
      <Channels />
      <Messages />
    </div>
  );
};

const Channels = () => {
  return <h3>Channels</h3>;
};
const Messages = () => {
  return <h3>Messages</h3>;
};

function App() {
  return (
    <div id="main">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
