import React from "react";
import { withStyles } from "@material-ui/core";
import MakeBookingForm from "./Booking/MakeBookingForm";

class Booking extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.bg}`}>
        <MakeBookingForm />
      </div>
    );
  }
}

const muiStyles = {
  bg: {
    position: "absolute",
    backgroundImage: `url(${require("../assets/office.png")})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0"
  }
};

export default withStyles(muiStyles)(Booking);
