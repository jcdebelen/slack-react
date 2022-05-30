import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  function register(email, password, passwordConfirmation) {

    let data = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
  
  let requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
    headers: {
      'Content-Type': 'Application/json'
  }
  };
  
  fetch("http://206.189.91.54//api/v1/auth/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  return (
    <div id="main-con">
      <h1>Slack Registration</h1>
      <form className="forms" onSubmit={e => {
        e.preventDefault()
        register(emailAddress, password, repeatPassword)
      }}>
        <div className="subform">
          <label>Email address</label>
          <input type="text" className="input" value={emailAddress} onChange={e => setEmailAddress(e.target.value)}></input>
        </div>
        <div className="subform">
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <div className="subform">
          <label>Repeat Password</label>
          <input type="password" className="input" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}></input>
        </div>
        <button type="submit" id="submit">
          Register
        </button>
      </form>
      <p>
        Already registered? Head back to Slack <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
