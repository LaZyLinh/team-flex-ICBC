import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Lending from "./Lending";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import ConfirmBooking from "./ConfirmBooking";
import Finished from "./Finished";
import AdminPage from "./AdminPage";
import EditFloor from "./EditFloor"

function App(props) {
  return (
    <Router>
      <div>
        <Route exact path="/lending">
          <Lending accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/confirm">
          <ConfirmBooking accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/finished">
          <Finished accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/booking">
          <Booking accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/withdraw">
          <Withdraw accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/">
          <Home accountInfo={props.accountInfo} />
        </Route>
        <Route exact path="/adminPage">
          <AdminPage />
        </Route>
        <Route exact path="/editFloor">
          <EditFloor />
        </Route>
      </div>
    </Router>
  );
}

export default App;
