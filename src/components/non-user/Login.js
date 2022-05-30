import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({setAccessToken, setClientToken, setExpiry, setUid}) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  function login(email, password) {
    let data = {
      email: email,
      password: password
  }
  
  let requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      redirect: 'follow',
      headers: {
          'Content-Type': 'Application/json'
      }
    };
    
    fetch("http://206.189.91.54//api/v1/auth/sign_in", requestOptions)
    .then(response => {
      setAccessToken(response.headers.get('access-token')) /* access-token header */
      setClientToken(response.headers.get('client')) /* client-token header */
      setExpiry(response.headers.get('expiry')) /* expiry header */
      setUid(response.headers.get('uid')) /* uid header */
      return response.text()
      })
    .then(result => {
      console.log(result)})
    .catch(error => console.log('error', error));
  }

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