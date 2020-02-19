import React from "react";
import logo from "./logo.svg";
import "./HomePage.css";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from "react-axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className="Main-button-box" id="Register-box">
              <Link className="Main-button-text" id="Register-text" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link to="/make">Make</Link>
            </li>
            <li>
              <Link to="/manage">Manage</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/make">
            <Make />
          </Route>
          <Route path="/manage">
            <Manage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Register() {
  return <h2>Register Office</h2>;
}

function Make() {
  return <h2>Make Booking</h2>;
}

function Manage() {
  return <h2>Manage Booking</h2>;
}
