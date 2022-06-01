import React from "react";
import { useRouteMatch } from "react-router-dom";
import Channels from "./components/user/Channels";
import Messages from "./components/user/Messages";

export default function Dashboard({ requiredHeaders }) {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Dashboard</h2>
      <Channels requiredHeaders={requiredHeaders} />
      <Messages requiredHeaders={requiredHeaders} />
    </div>
  );
}
