import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Button variant="contained" href="/availabilities">
          Register Office
        </Button>
        <Button variant="contained" href="/bookings">
          Make Booking
        </Button>
        <Button variant="contained" href="/withdraw">
          Manage Booking
        </Button>
        <Link href="/admin">Admin</Link>
      </div>
    );
  }
}

export default Home;
