import React from "react";
import { useState, useEffect } from "react";

function retrieveMessage(headersObject, senderId, setListOfMessages) {
  let myHeaders = new Headers();
  myHeaders.append("access-token", headersObject.accessToken);
  myHeaders.append("client", headersObject.clientToken);
  myHeaders.append("expiry", headersObject.expiry);
  myHeaders.append("uid", headersObject.uid);
  myHeaders.append("Content-Type", "Application/json");

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `http://206.189.91.54//api/v1/messages?sender_id=${headersObject.currentUserId}&receiver_class=Channel&receiver_id=${senderId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(JSON.parse(result).data))
    .catch((error) => console.log("error", error));
}

function sendMessage(headersObject, receiverId, message) {
  let myHeaders = new Headers();
  myHeaders.append("access-token", headersObject.accessToken);
  myHeaders.append("client", headersObject.clientToken);
  myHeaders.append("expiry", headersObject.expiry);
  myHeaders.append("uid", headersObject.uid);
  myHeaders.append("Content-Type", "Application/json");

  let raw = {
    receiver_id: receiverId,
    receiver_class: "User",
    body: message,
  };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  fetch("http://206.189.91.54//api/v1/messages", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export default function Messages({ requiredHeaders }) {
  const [messageInput, setMessageInput] = useState("");
  const [listOfMessages, setListOfMessages] = useState(false);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  let users = searchedUser.map((user) => (
    <h1 id={user.id} onClick={(e) => setSelectedUserId(e.target.id)}>
      {user.uid}
    </h1>
  ));

  useEffect(() => {
    console.log(selectedUserId);
  }, [selectedUserId]);

  function retrieveMessageButton(e) {
    retrieveMessage(requiredHeaders, selectedUserId, setListOfMessages);
  }

  function submitHandler(e) {
    e.preventDefault();
    sendMessage(requiredHeaders, selectedUserId, messageInput);
    setMessageInput("");
  }

  useEffect(() => {
    showUser(requiredHeaders);
  }, [searchUserInput]);

  function showUser(headersObject) {
    let myHeaders = new Headers();
    myHeaders.append("access-token", headersObject.accessToken);
    myHeaders.append("client", headersObject.clientToken);
    myHeaders.append("expiry", headersObject.expiry);
    myHeaders.append("uid", headersObject.uid);
    myHeaders.append("Content-Type", "Application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://206.189.91.54//api/v1/users", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let arrayOfUsers = JSON.parse(result).data;
        setSearchedUser(
          arrayOfUsers.filter((user) => user.uid.includes(searchUserInput))
        );
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <h1>New Messages</h1>
      <input
        className="search-all-user-input"
        type="text"
        value={searchUserInput}
        onChange={(e) => setSearchUserInput(e.target.value)}
      />
      {users}
      <button onClick={retrieveMessageButton}>Retrieve Messages</button>
      <form onSubmit={submitHandler}>
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
