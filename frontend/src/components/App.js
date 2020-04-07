import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Lending from "./Lending";
import Booking from "./Booking";
import Withdraw from "./Withdraw";
import Finished from "./Finished";
import EditFloor from "./EditFloor";
import AdminPage from "./AdminPage";
import EditWorkspace from "./admin/EditWorkspace";

function App(props) {
  return (
    <Router>
      <div>
        <Route exact path="/lending">
          <Lending accountInfo={props.accountInfo} />
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
        <Route
          path="/admin/edit-floors/:locationName"
          component={({ match }) => <EditFloor locationName={match.params.locationName} />}
        />
        <Route exact path="/editFloor">
          <EditFloor />
        </Route>
        <Route
          path="/editWorkspace/:floorId"
          component={({ match }) => <EditWorkspace floorId={match.params.floorId} />}
        />
        <Route exact path="/editWs">
          <EditWorkspace />
        </Route>
      </div>
    </Router>
  );
}

export default App;
