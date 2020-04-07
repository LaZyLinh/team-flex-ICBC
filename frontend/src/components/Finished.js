import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";

class Finished extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.bg}`}>
        <div className={`${classes.text} ${classes.label}`}>
          Your request is recorded. A confirmation email has been sent.
        </div>
        <Button className={`${classes.btn} ${classes.btn1} ${classes.label1}`} variant="contained" href="/">
          <Home className={`${classes.home}`}></Home>
        </Button>
      </div>
    );
  }
}

const muiStyles = {
  bg: {
    position: "absolute",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0",
    color: "white"
  },
  btn: {
    background: "rgba(0, 72, 168, 0.85)",
    borderRadius: "20px",
    textAlign: "center",
    height: "10vh",
    width: "20vw"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1.7vw",
    lineHeight: "8vh",
    textDecoration: "none",
    color: "#817B7B",
    display: "inline-block",
    textAlign: "center"
  },
  btn1: {
    position: "absolute",
    left: "40%",
    right: "45%",
    top: "45%",
    bottom: "50%"
  },
  text: {
    position: "absolute",
    left: "20%",
    right: "20%",
    top: "35%",
    bottom: "40%"
  },
  home: {
    color: "#FFFFFF"
  }
};

export default withStyles(muiStyles)(Finished);
