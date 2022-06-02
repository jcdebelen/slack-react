import React from "react";
import { useRouteMatch } from "react-router-dom";
import Messages from "./components/user/Messages";
import ListOfChannels from "./components/user/sidebar/ListOfChannels";

export default function Dashboard({ requiredHeaders }) {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Dashboard</h2>
      <ListOfChannels requiredHeaders={requiredHeaders} />
      <Messages requiredHeaders={requiredHeaders} />
    </div>
  );
}
