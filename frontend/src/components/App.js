import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Availability from "./Availability";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/availabilities">
          <Availability />
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
