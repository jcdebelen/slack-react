import React from "react";
import { useState } from "react";

export default function Channels({ accessToken, clientToken, expiry, uid }) {
  let [channel, setChannel] = useState("");
  let id = [2087];

  let createChannel = (channel, id) => {
    let data = {
      name: channel,
      user_ids: id,
    };

    var myHeaders = new Headers();

    myHeaders.append("access-token", accessToken);
    myHeaders.append("client", clientToken);
    myHeaders.append("expiry", expiry);
    myHeaders.append("uid", uid);
    myHeaders.append("Content-Type", "Application/json");

    var raw = JSON.stringify(data);

    console.log({ accessToken, clientToken, expiry, uid });

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
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createChannel(channel, id);
        }}
      >
        <input
          type="text"
          className="input"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
