import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Availability from "./Availability";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import Admin from "./Admin";
import axios from "axios";
import ConfirmBooking from "./ConfirmBooking";

// CHANGE THIS FOR BACKEND ENDPOINT
const baseURL = "34.224.250.122:6000/";

function App() {
  const axiosInstance = axios.create({ baseURL: baseURL });

  return (
    <Router>
      <div>
        <Route exact path="/availabilities">
          <Availability />
        </Route>
        <Route exact path="/confirm">
          <ConfirmBooking />
        </Route>
        <Route exact path="/bookings">
          <Booking />
        </Route>
        <Route exact path="/withdraw">
          <Withdraw />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
