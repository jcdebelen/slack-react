import React from "react";
import Messages from "./components/user/Messages";
import Channels from "./components/user/Channels";
import ListOfChannels from "./components/user/sidebar/ListOfChannels";
import ListOfDMs from "./components/user/sidebar/ListOfDMs";
import { useState } from "react";

export default function Dashboard({ requiredHeaders }) {
  let [currentChannel, setCurrentChannel] = useState({});
  let [channelStatus, setChannelStatus] = useState(false);

  return (
    <div id="dashboard">
      <nav id="sidebar">
        <ListOfChannels
          requiredHeaders={requiredHeaders}
          setCurrentChannel={setCurrentChannel}
          setChannelStatus={setChannelStatus}
        />
        <ListOfDMs requiredHeaders={requiredHeaders} />
      </nav>
      <div id="conversations">
        <Messages requiredHeaders={requiredHeaders} />
        <Channels
          requiredHeaders={requiredHeaders}
          currentChannel={currentChannel}
          channelStatus={channelStatus}
        />
      </div>
    </div>
  );
}
