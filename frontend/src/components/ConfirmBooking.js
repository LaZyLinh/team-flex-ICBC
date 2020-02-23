import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { TextField, withStyles } from "@material-ui/core";

class ConfirmBooking extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 1200 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  render() {
    this.startTimer();
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={`${classes.bg}`}>
          <div className={`${classes.text1}`}>Booking Confirmation</div>
          <div className={`${classes.box1}`}></div>
          <div className={`${classes.box2}`}>
            <div className={`${classes.employText}`}>Employee Information</div>
            <TextField
              className={`${classes.employID}`}
              id="outlined-basic"
              label="Office Booker's ID"
              variant="outlined"
            />
            <TextField
              className={`${classes.employName}`}
              id="outlined-basic"
              label="Office Booker's Name"
              variant="outlined"
            />
            <TextField
              className={`${classes.employDept}`}
              id="outlined-basic"
              label="Office Booker's Department"
              variant="outlined"
            />
            <TextField
              className={`${classes.comment}`}
              id="outlined-basic"
              label="Comments"
              variant="outlined"
              multiline
              rows={6}
            />
          </div>
        </div>
        <div className={`${classes.btmBg}`}>
          <Button className={`${classes.label} ${classes.btn} ${classes.btn1}`} variant="contained" href="/withdraw">
            Confirm Booking
          </Button>
          <Button className={`${classes.label} ${classes.btn} ${classes.btn2}`} variant="contained" href="/bookings">
            Go Back
          </Button>
        </div>
        <div className={`${classes.timer}`}>
          Time Remaining: {this.state.time.m} : {this.state.time.s}
        </div>
      </React.Fragment>
    );
  }
}

const muiStyles = {
  bg: {
    position: "absolute",
    left: "1.50%",
    right: "1.50%",
    top: "1.56%",
    bottom: "10%",
    background: "#002D7D",
    borderRadius: "20px"
  },
  btmBg: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "91%",
    bottom: "0%",
    background: "#EBF2FF"
  },
  btn: {
    background: "#0048A8",
    borderRadius: "20px",
    textAlign: "center"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "100%",
    lineHeight: "29px",
    display: "flex",
    alignItems: "left",
    textAlign: "center",
    color: "#FFFFFF"
  },
  arrow: {
    position: "absolute",
    left: "93.19%",
    right: "3.96%",
    top: "50.59%",
    bottom: "49.41%",

    border: "5px solid #FFFFFF",
    boxSizing: "border-box",
    transform: "rotate(0.11deg)"
  },
  btn1: {
    position: "absolute",
    left: "73.47%",
    right: "1.50%",
    top: "10%",
    bottom: "10%"
  },
  btn2: {
    position: "absolute",
    left: "1.5%",
    right: "73.47%",
    top: "10%",
    bottom: "10%"
  },
  text1: {
    position: "absolute",
    left: "6%",
    right: "67%",
    top: "5%",
    bottom: "90.67%",
    fontFamily: "Inter",
    fontASyle: "normal",
    fontWeight: "600",
    fontSize: "28px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF"
  },
  box1: {
    position: "absolute",
    left: "3.82%",
    right: "67%",
    top: "12.33%",
    bottom: "4%",
    background: "#EBF0F8",
    borderRadius: "20px"
  },
  box2: {
    position: "absolute",
    left: "36%",
    right: "3.82%",
    top: "18%",
    bottom: "4%",

    background: "#7D90B2",
    borderRadius: "20px"
  },
  employText: {
    position: "absolute",
    left: "3%",
    right: "50%",
    top: "5%",
    bottom: "10%",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "36px",
    color: "#FFFFFF",
    textAlign: "left"
  },
  employID: {
    position: "absolute",
    left: "3%",
    right: "5%",
    top: "18%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  employName: {
    position: "absolute",
    left: "3%",
    right: "5%",
    top: "33%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  employDept: {
    position: "absolute",
    left: "3%",
    right: "5%",
    top: "48%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  comment: {
    position: "absolute",
    left: "3%",
    right: "5%",
    top: "63%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  timer: {
    position: "absolute",
    left: "76.67%",
    right: "4.86%",
    top: "4.22%",
    bottom: "87.67%",

    background: "#F4F7FC",
    borderRadius: "20px"
  }
};

export default withStyles(muiStyles)(ConfirmBooking);
