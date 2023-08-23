import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const host = "http://localhost:5000";
  const [cred, setcred] = useState({
    name: "",
    cpassword: "",
    email: "",
    password: "",
  });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("djiojei");
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
    } else {
      alert("Invalid Credentials");
    }
    console.log("hello");
  };
  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={onChange}
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={onChange}
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
