import React from "react";
import { useState } from "react";

function retrieveMessage(headersObject, senderId = 2121, setListOfMessages) {
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
    `http://206.189.91.54//api/v1/messages?sender_id=${headersObject.currentUserId}&receiver_class=User&receiver_id=${senderId}`,
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

  console.log(typeof listOfMessages);

  function submitHandler(e) {
    e.preventDefault();
    sendMessage(requiredHeaders, 2086, messageInput);
    setMessageInput("");
  }

  function retrieveMessageButton(e) {
    retrieveMessage(requiredHeaders, 2121, setListOfMessages);
  }

  return (
    <div>
      <h1>Messages</h1>
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
