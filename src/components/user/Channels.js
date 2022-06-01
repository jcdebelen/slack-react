import React from "react";
import { useState, useEffect } from "react";

export default function Channels({ requiredHeaders }) {
  let [createchannel, setCreateChannel] = useState("");
  let [modal, setModal] = useState(false);
  let [members, setMembers] = useState([]);
  let [member, setMember] = useState("");
  let [ids, setIds] = useState([]);
  let [channels, setChannels] = useState([]);

  var myHeaders = new Headers();

  var requestGet = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  myHeaders.append("access-token", requiredHeaders.accessToken);
  myHeaders.append("client", requiredHeaders.clientToken);
  myHeaders.append("expiry", requiredHeaders.expiry);
  myHeaders.append("uid", requiredHeaders.uid);
  myHeaders.append("Content-Type", "Application/json");

  let createChannel = (createchannel, ids) => {
    let data = {
      name: createchannel,
      user_ids: ids,
    };

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
    fetch("http://206.189.91.54//api/v1/users", requestGet)
      .then((response) => response.text())
      .then((result) => {
        let parse = JSON.parse(result).data;
        let find = parse.find((email) => {
          return email.uid === member;
        });

        if (find !== undefined) {
          let id = find.id;
          setMembers((prevData) => {
            return [newMember, ...prevData];
          });
          setIds((prevData) => {
            return [id, ...prevData];
          });
        } else console.log("no user");
      })
      .catch((error) => console.log("error", error));
  };

  // show channels
  useEffect(() => {
    fetch("http://206.189.91.54//api/v1/channels", requestGet)
      .then((response) => response.text())
      .then((result) => {
        let parse = JSON.parse(result).data;
        let channels = parse.map((data) => {
          return { name: data.name, id: data.id };
        });
        setChannels(channels);
      })
      .catch((error) => console.log("error", error));
  });

  let MyChannels = () => {
    return channels.map((channels, index) => (
      <div key={index}>
        <button>{channels.name}</button>
      </div>
    ));
  };

  return (
    <>
      <h1>Channels</h1>
      <MyChannels />
      {modal ? (
        <div>
          <button onClick={() => setModal(false)}>x</button>
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
              createChannel(createchannel, ids);
            }}
          >
            <label>Channel Name</label>
            <input
              type="text"
              className="input"
              value={createchannel}
              onChange={(e) => setCreateChannel(e.target.value)}
            ></input>
            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <>
          <button onClick={() => setModal(true)}> Create Channel</button>
        </>
      )}
    </>
  );
}
