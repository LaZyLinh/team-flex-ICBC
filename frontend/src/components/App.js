import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Availability from "./Availability";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import Admin from "./Admin";
import ConfirmBooking from "./ConfirmBooking";
import Finished from "./Finished";

function App(props) {
  const userInfo = props.userInfo;
  return (
    <Router>
      <div>
        <Route exact path="/availabilities">
          <Availability userInfo={userInfo} />
        </Route>
        <Route exact path="/confirm">
          <ConfirmBooking userInfo={userInfo} />
        </Route>
        <Route exact path="/finished">
          <Finished userInfo={userInfo} />
        </Route>
        <Route exact path="/bookings">
          <Booking userInfo={userInfo} />
        </Route>
        <Route exact path="/withdraw">
          <Withdraw userInfo={userInfo} />
        </Route>
        <Route exact path="/admin">
          <Admin userInfo={userInfo} />
        </Route>
        <Route exact path="/">
          <Home userInfo={userInfo} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
