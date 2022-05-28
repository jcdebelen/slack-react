import { BrowserRouter as Router, Link } from "react-router-dom";

const Login = () => {
  return (
    <div id="main-con">
      <h1>Sign in to Slack</h1>
      <form className="forms">
        <div className="subform">
          <label>Email address</label>
          <input type="text" className="input"></input>
        </div>
        <div className="subform">
          <label>Password</label>
          <input type="password" className="input"></input>
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
