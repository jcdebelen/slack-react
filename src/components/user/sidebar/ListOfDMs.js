import React from 'react'
import { useState } from 'react'

export default function ListOfDMs({requiredHeaders}) {
  const [isDMHeaderClicked, setIsDMHeaderClicked] = useState(false);
  const [isDMHeaderHovered, setIsDMHeaderHovered] = useState(false);
  const[recentDMUsers, setRecentDMUsers] = useState([])
  // const [recentDMUsersUid, setRecentDMUsersUid] = useState([])

  const handleDMHeaderCLicked = () => {
    setIsDMHeaderClicked(!isDMHeaderClicked);

    //Get recently DMS API
    var myHeaders = new Headers();
    myHeaders.append("access-token", requiredHeaders.accessToken);
    myHeaders.append("client", requiredHeaders.clientToken);
    myHeaders.append("expiry", requiredHeaders.expiry);
    myHeaders.append("uid", requiredHeaders.uid);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://206.189.91.54//api/v1/users/recent", requestOptions)
    .then(response => response.json())
    .then((result) => {
      let listOfRecentDMs = result.data;
      // setRecentDMUsers(listOfRecentDMs)
      setRecentDMUsers(listOfRecentDMs.map(({email, id}) => ({email, id})))
      // console.log(recentDMUsers)
      // console.log(recentDMUsersUid)
    })
    .catch(error => console.log('error', error));
  }

  function DMUsers({requiredHeaders, recentDMUsers}) {
    // const {email, id} = recentDMUsers;
    return recentDMUsers.map(({email, id}) => (
      <div key={id}>
          <DMUser email={email} id={id} requiredHeaders={requiredHeaders} />
      </div>
    ))
  }

  function DMUser ({email, id, requiredHeaders}) {
    const [listOfMessages, setListOfMessages] = useState([]);

    const handleUserClicked = () => {
      let myHeaders = new Headers();
      myHeaders.append("access-token", requiredHeaders.accessToken);
      myHeaders.append("client", requiredHeaders.clientToken);
      myHeaders.append("expiry", requiredHeaders.expiry);
      myHeaders.append("uid", requiredHeaders.uid);
      myHeaders.append("Content-Type", "Application/json");

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `http://206.189.91.54//api/v1/messages?&receiver_class=User&receiver_id=${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          let messageList = result.data
          setListOfMessages(messageList.map(({body, receiver, sender}) => ({body, receiver, sender})))
          // console.log(messageList)
          console.log(listOfMessages)
        })
        .catch((error) => console.log("error", error));
    }

    return (
      <li className="li-DMUser" onClick={handleUserClicked}>
        {email}
        
      </li>
    )
  }

  return (
    <div>
      <div 
      className="header-dm" 
      onMouseEnter={() => setIsDMHeaderHovered(true)} 
      onMouseLeave={() => setIsDMHeaderHovered(false)}
      >
        <div onClick={handleDMHeaderCLicked}>
          <button>A</button>    {/*<-------change to arrow icon FaSortDown from react-icons/fa */}
          <span>Direct messages</span>
        </div>
        <button className={`${isDMHeaderHovered ? 'hovered' : 'not-hovered'}`}>+</button>   {/*<--------change to plus icon   FaPlus*/}
      </div>
      <nav className={`${isDMHeaderClicked ? 'dms-active' : 'dms-inactive'}`}>
        <ul className="ul-DMUsers">
          <DMUsers requiredHeaders={requiredHeaders} recentDMUsers={recentDMUsers} />
        </ul>
      </nav>
    </div>
  )
}
