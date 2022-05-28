import { BrowserRouter as Router, Link } from "react-router-dom";

const Register = () => {
  return (
    <div id="main-con">
      <h1>Slack Registration</h1>
      <form className="forms">
        <div className="subform">
          <label>Email address</label>
          <input type="text" className="input"></input>
        </div>
        <div className="subform">
          <label>Password</label>
          <input type="password" className="input"></input>
        </div>
        <div className="subform">
          <label>Repeat Password</label>
          <input type="password" className="input"></input>
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
