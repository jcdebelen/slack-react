import React from "react";
import Messages from "./components/user/Messages";
import Channels from "./components/user/Channels";
import ListOfChannels from "./components/user/sidebar/ListOfChannels";
import ListOfDMs from "./components/user/sidebar/ListOfDMs";

export default function Dashboard({ requiredHeaders }) {
  return (
    <div id="dashboard">
      <nav id="sidebar">
        <ListOfChannels requiredHeaders={requiredHeaders} />
        <ListOfDMs requiredHeaders={requiredHeaders} />
      </nav>
      <div id="conversations">
        <Messages requiredHeaders={requiredHeaders} />
        <Channels requiredHeaders={requiredHeaders} />
      </div>
    </div>
  );
}
