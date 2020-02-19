import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core";

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button
          className={`${classes.btn} ${classes.label} ${classes.btn1} ${classes.label1}`}
          variant="contained"
          href="/availabilities"
        >
          Register Office
        </Button>

        <Button
          className={`${classes.btn} ${classes.label} ${classes.btn2} ${classes.label2}`}
          variant="contained"
          href="/bookings"
        >
          Make Booking
        </Button>
        <Button
          className={`${classes.btn} ${classes.label} ${classes.btn3} ${classes.label3}`}
          variant="contained"
          href="/withdraw"
        >
          Manage Booking
        </Button>
        <Link className={classes.link} href="/admin">
          Admin
        </Link>
      </React.Fragment>
    );
  }
}

const muiStyles = {
  btn: {
    background: "#002D7D",
    borderRadius: "15px",
    textAlign: "center"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "42px",
    textDecoration: "none",
    color: "#FFFFFF",
    display: "inline-block",
    textAlign: "center"
  },
  btn1: {
    position: "absolute",
    left: "59.17%",
    right: "12.43%",
    top: "31.78%",
    bottom: "58.44%"
  },
  btn2: {
    position: "absolute",
    left: "59.17%",
    right: "12.43%",
    top: "45.11%",
    bottom: "45.11%"
  },
  btn3: {
    position: "absolute",
    left: "59.17%",
    right: "12.43%",
    top: "58.44%",
    bottom: "31.78%"
  },
  label1: {
    position: "absolute",
    left: "59.93%",
    right: "13.19%",
    top: "31.78%",
    bottom: "58.44%"
  },
  label2: {
    position: "absolute",
    left: "59.93%",
    right: "13.19%",
    top: "45.11%",
    bottom: "45.11%"
  },
  label3: {
    position: "absolute",
    left: "59.93%",
    right: "13.19%",
    top: "58.44%",
    bottom: "31.78%"
  },
  link: {
    position: "absolute",
    left: "50%",
    right: "0%",
    top: "95.44%",
    bottom: "0%"
  }
};

export default withStyles(muiStyles)(Home);
