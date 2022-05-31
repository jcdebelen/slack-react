import React from "react";
import { useState } from "react";

export default function Channels({ requiredHeaders }) {
  let [channel, setChannel] = useState("");
  let [modal, setModal] = useState(false);
  let [members, setMembers] = useState([]);
  let [member, setMember] = useState("");

  let id = [2087];

  let createChannel = (channel, id) => {
    let data = {
      name: channel,
      user_ids: id,
    };

    var myHeaders = new Headers();

    myHeaders.append("access-token", requiredHeaders.accessToken);
    myHeaders.append("client", requiredHeaders.clientToken);
    myHeaders.append("expiry", requiredHeaders.expiry);
    myHeaders.append("uid", requiredHeaders.uid);
    myHeaders.append("Content-Type", "Application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://206.189.91.54//api/v1/channels", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  let addMember = (newMember) => {
    setMembers((prevData) => {
      return [newMember, ...prevData];
    });
  };

  return (
    <>
      <h1>Channels</h1>
      {modal ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addMember(member);
            }}
          >
            <label>Invite Members</label>
            <input
              type="email"
              className="input"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            ></input>
            <button type="submit">add</button>
          </form>
          <p>
            {members.map((email, index) => (
              <div key={index}>{email}</div>
            ))}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createChannel(channel, id);
            }}
          >
            <label>Channel Name</label>
            <input
              type="text"
              className="input"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            ></input>
            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <>
          <button onClick={setModal(true)}> Create Channel</button>
        </>
      )}
    </>
  );
}
