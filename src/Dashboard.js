import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import Channels from './components/user/Channels';
import Messages from './components/user/Messages';

export default function Dashboard({accessToken, clientToken, expiry, uid}) {
    let match = useRouteMatch();

  return (
    <div>
      <h2>Dashboard</h2>
      <Channels />
      <Messages />
    </div>
  )
}
