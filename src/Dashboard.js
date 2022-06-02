import React from "react";
import { useRouteMatch } from "react-router-dom";
import Channels from "./components/user/Channels";
import Messages from "./components/user/Messages";
import Sidebar from "./components/user/sidebar/Sidebar";
import { useState } from "react";

export default function Dashboard({ requiredHeaders }) {
  let match = useRouteMatch();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  return (
    <div>
      <Sidebar
        requiredHeaders={requiredHeaders}
        selectedUserEmail={selectedUserEmail}
        setSelectedUserEmail={setSelectedUserEmail}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <Messages
        requiredHeaders={requiredHeaders}
        selectedUserEmail={selectedUserEmail}
        setSelectedUserEmail={setSelectedUserEmail}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    </div>
  );
}
