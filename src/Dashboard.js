import React from "react";
import { useRouteMatch } from "react-router-dom";
import Channels from "./components/user/Channels";
import Messages from "./components/user/Messages";
import Sidebar from "./components/user/sidebar/Sidebar";

export default function Dashboard({ requiredHeaders }) {
  let match = useRouteMatch();
  return (
    <div>
      <Sidebar requiredHeaders={requiredHeaders} />
      <Messages requiredHeaders={requiredHeaders} />
    </div>
  );
}
