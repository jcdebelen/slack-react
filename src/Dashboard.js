import React from "react";
import Messages from "./components/user/Messages";
import Channels from "./components/user/Channels";
import ListOfChannels from "./components/user/sidebar/ListOfChannels";
import ListOfDMs from "./components/user/sidebar/ListOfDMs";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function Dashboard({ requiredHeaders }) {
  let [currentChannel, setCurrentChannel] = useState({});
  let [channelStatus, setChannelStatus] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [receiverClass, setReceiverClass] = useState("");

  const handleNewMessageClicked = () => {
    setReceiverClass("User");
    setSelectedUserEmail("New Message");
    setSelectedUserId("");
  };

  return (
    <div id="dashboard">
      <div id="sidebar">
        <div className="sidebar-header">
          <h2>Avion School</h2>
          <div className="button-new-message" onClick={() => {
            setSelectedUserEmail("New Message");
            setSelectedUserId("");
          }}>
            <FaRegEdit />
          </div>
        </div>
        <nav className="sidebar-content">
          <ListOfChannels
            requiredHeaders={requiredHeaders}
            setCurrentChannel={setCurrentChannel}
            setChannelStatus={setChannelStatus}
            setReceiverClass={setReceiverClass}
            setSelectedUserId={setSelectedUserId}
            />
          <ListOfDMs
            requiredHeaders={requiredHeaders}
            setSelectedUserEmail={setSelectedUserEmail}
            setSelectedUserId={setSelectedUserId}
            setReceiverClass={setReceiverClass}
          />
        </nav>
      </div>
      <div id="conversations">
        <Channels
          requiredHeaders={requiredHeaders}
          currentChannel={currentChannel}
          channelStatus={channelStatus}
        />
        <Messages
          requiredHeaders={requiredHeaders}
          selectedUserEmail={selectedUserEmail}
          setSelectedUserEmail={setSelectedUserEmail}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          receiverClass={receiverClass}
        />
      </div>
    </div>
  );
}
