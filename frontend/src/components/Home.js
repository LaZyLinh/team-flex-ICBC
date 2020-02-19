import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Button variant="contained" className="Main-button-box" id="Register-box">
          <Link className="Main-button-text" to="/register">
            Register Office
          </Link>
        </Button>
        <Button variant="contained" className="Main-button-box" id="MakeBooking-box">
          <Link className="Main-button-text" to="/register">
            Make Booking
          </Link>
        </Button>
        <Button variant="contained" className="Main-button-box" id="ManageBooking-box">
          <Link className="Main-button-text" to="/register">
            Manage Bookings
          </Link>
        </Button>
        <Link href="/admin">Admin</Link>
      </div>
    );
  }
}

export default Home;
