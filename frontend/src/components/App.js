import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Availability from "./Availability";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import Admin from "./Admin";
import ConfirmBooking from "./ConfirmBooking";
import Finished from "./Finished";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/availabilities">
          <Availability />
        </Route>
        <Route exact path="/confirm">
          <ConfirmBooking />
        </Route>
        <Route exact path="/finished">
          <Finished />
        </Route>
        <Route exact path="/bookings">
          <Booking />
        </Route>
        <Route exact path="/withdraw">
          <Withdraw />
        </Route>
        <Route exact path="/AdminPage">
          <AdminPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
