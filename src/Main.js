import React, { useEffect } from 'react'
import Dashboard from './Dashboard'
import App from './App'
import { useState } from 'react'

export default function Main() {
    const [accessToken, setAccessToken] = useState('')
    const [clientToken, setClientToken] = useState('')
    const [expiry, setExpiry] = useState('')
    const [uid, setUid] = useState('')

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (uid !== '') {
            setIsAuthenticated(true)
        } else if (uid === '') {
            setIsAuthenticated(false)
        }
    }, [uid])

  return (
    <div>
        {isAuthenticated ? <Dashboard 
        accessToken={accessToken} 
        clientToken={clientToken} 
        expiry={expiry} 
        uid={uid} /> : <App 
        setAccessToken={setAccessToken} 
        setClientToken={setClientToken} 
        setExpiry={setExpiry} 
        setUid={setUid} />}
    </div>
  )
}
