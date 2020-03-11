import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: "START_DATE"
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.userInfo);
    return (
      <div className={`${classes.bg}`}>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />

        {/* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/src/Account.ts */}
        <h1>Hello, {this.props.userInfo.account.name}</h1>
        <h1>Your email address is: {this.props.userInfo.account.userName}</h1>
        <Button
          className={`${classes.btn} ${classes.label} ${classes.btn1} ${classes.label1}`}
          variant="contained"
          href="/availabilities"
        >
          Lend Office
        </Button>
        <Button
          className={`${classes.btn} ${classes.label} ${classes.btn2} ${classes.label2}`}
          variant="contained"
          href="/bookings"
        >
          Book Office
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
      </div>
    );
  }
}

const muiStyles = {
  bg: {
    position: "absolute",
    backgroundImage: `url(${require("../assets/van_bg.png")})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0"
  },
  btn: {
    background: "rgba(0,18,49,1)",
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
  btn4: {
    position: "absolute",
    left: "59.17%",
    right: "12.43%",
    top: "70.44%",
    bottom: "78.78%"
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
  label4: {
    position: "absolute",
    left: "59.93%",
    right: "13.19%",
    top: "70.44%",
    bottom: "78.78%"
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
