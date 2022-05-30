import { Link } from "react-router-dom";
import { login } from "../api";
import { useState } from "react";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  // const [accessToken, setAccessToken] = useState('')
  // const [clientToken, setClientToken] = useState('')
  // const [expiry, setExpiry] = useState('')
  // const [uid, setUid] = useState('')

  // console.log(accessToken)
  // console.log(clientToken)
  // console.log(expiry)
  // console.log(uid)

  // let accountHeaders = [...response.headers]
  // console.log(accountHeaders)
  // setAccessToken(accountHeaders[0][1]) /* access-token header */
  // setClientToken(accountHeaders[2][1]) /* client-token header */
  // setExpiry(accountHeaders[4][1]) /* expiry header */
  // setUid(accountHeaders[6][1]) /* uid header */

  return (
    <div id="main-con">
      <h1>Sign in to Slack</h1>
      <form className="forms" onSubmit={e => {
        e.preventDefault()
        login(emailAddress, password)
      }}>
        <div className="subform">
          <label>Email address</label>
          <input type="text" className="input" value={emailAddress} onChange={e => setEmailAddress(e.target.value)}></input>
        </div>
        <div className="subform">
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <button type="submit" id="submit">
          Sign In
        </button>
      </form>
      <p>
        Not yet registered? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
