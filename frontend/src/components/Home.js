import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to="/availabilities">Register Office</Link>
        <Link to="/bookings">Make Booking</Link>
        <Link to="/withdraw">Manage Booking</Link>
        <Link to="/admin">Admin</Link>
      </div>
    );
  }
}

export default Home;
