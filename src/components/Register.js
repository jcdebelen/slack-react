import { Link } from "react-router-dom";
import { register } from "../api";
import { useState } from "react";

const Register = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

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
