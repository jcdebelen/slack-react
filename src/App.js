import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const Home = () => {
  return <h1>Home</h1>;
};

const Login = () => {
  return <h1>Login</h1>;
};

const Message = () => {
  return <h1>Message</h1>;
};

// messages coming from the database server
const messages = [
  {
    id: "q12341234",
    name: "Edcel",
  },
  {
    id: "q12341234",
    name: "Carlo",
  },
];

const Messages = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Direct Message</h2>

      <ul>
        {messages.map((channel) => {
          return (
            <li>
              <Link to={`${match.url}/channels/${channel.id}`}>
                {" "}
                {channel.name.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route path={`${match.path}/:messageId`}>
          <Message />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic</h3>
        </Route>
      </Switch>
    </div>
  );
};

const Channel = () => {
  let { channelId, messageId } = useParams();
  return (
    <h3>
      Requested Channel ID: {channelId}, {messageId}
    </h3>
  );
};

const channels = [
  {
    id: "q12341234",
    name: "Batch18",
  },
  {
    id: "q12341234",
    name: "Batch1",
  },
];

const Channels = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Channels</h2>

      <ul>
        {channels.map((channel) => {
          return (
            <li>
              <Link to={`${match.url}/channels/${channel.id}`}>
                {" "}
                {channel.name.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route path={`${match.path}/:channelId/:messageId`}>
          <Message />
        </Route>
        <Route path={`${match.path}/:channelId`}>
          <Channel />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic</h3>
        </Route>
      </Switch>
    </div>
  );
};

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

const NotFound = () => {
  return (
    <div>
      <h1>Page cannot be found.</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/channels">
          <Channels />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
