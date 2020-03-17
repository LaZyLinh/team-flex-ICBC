import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Lending from "./Lending";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import ConfirmBooking from "./ConfirmBooking";
import Finished from "./Finished";

function App(props) {
  const userInfo = props.userInfo;
  // TODO make request to backend with email, then store staffId
  // request("http://localhost:8080/auth/user?email=" + userInfo.account.userName);
  return (
    <Router>
      <div>
        <Route exact path="/lending">
          <Lending userInfo={userInfo} />
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
        <Route exact path="/">
          <Home userInfo={userInfo} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
