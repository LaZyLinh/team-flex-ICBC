import React from "react";
import { withStyles } from "@material-ui/core";
import OfficeBookingApi from "../api/OfficeBookingApi";
import OfficeLendingApi from "../api/OfficeLendingApi";
import { GiChecklist } from "react-icons/gi";
import styles from "../styles/Withdraw.styles";
import logo from "../assets/home_logo.png";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ManageTable from "./display/ManageTable";
import Display_SmallSquare from "./display/Display_SmallSquare";
import NoBooking from "./display/NoBookingFound";

import Home from "./Home";

import Link from "@material-ui/core/Link";
import ApiClient from "../ApiClient";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      bookings: [],
      lendings: []
    };
  }

  componentDidMount = async () => {
    const userInfo = await ApiClient.instance.callApi(
      "/auth/user",
      "POST",
      {},
      {},
      { Authorization: "Bearer " + this.props.accountInfo.jwtIdToken },
      { Email: this.props.accountInfo.account.userName },
      null,
      [],
      ["application/x-www-form-urlencoded"],
      ["application/json"],
      Object,
      null
    );
    this.setState({ staffId: userInfo.StaffId });
    const reqs = [
      OfficeBookingApi.getBookingsByUserID(userInfo.StaffId),
      OfficeLendingApi.getAvailabilitiesByOwnerID(userInfo.StaffId)
    ];
    const results = await Promise.all(reqs);
    this.setState({
      bookings: results[0],
      lendings: results[1]
    });
    console.log(results[0]);
    console.log(results[1]);
  };

  renderBookings = () => {
    const items = [];
    const i = 1;
    for (const booking of this.state.bookings) {
      if (booking.confirmed) {
        items.push(
          <ExpansionPanelDetails key={i}>
            <Card className={classes.availabilityItem}>
              <CardContent>
                <Typography variant="h6" component="h6" className={classes.availTitle} gutterBottom>
                  Booking {i}
                </Typography>
                <Typography>
                  <strong>Start:</strong> {booking.startDate.toISOString().slice(0, 10)}
                  <br />
                  <strong>End:</strong> {booking.endDate.toISOString().slice(0, 10)}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  <strong>Location:</strong> {booking.location}
                  <br />
                  <strong>Workspace:</strong> {booking.workspaceId}
                  <br />
                  <strong>Booking Id:</strong> {booking.bookingId}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleClickFloorPlan} data-id={booking.floor.floorId}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </ExpansionPanelDetails>
        );
      }

      i++;
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary className={classes.pkgSummary} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.packageHeading}>
            <Typography variant="h4" component="h4" style={{ fontFamily: "Inter" }}>
              Bookings
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <div className={classes.availContainer}>{items}</div>
      </ExpansionPanel>
    );
  };

  renderLendings = () => { };

  render = () => {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <Link href="/">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
          <div className={classes.title}>MANAGE</div>
          <GiChecklist className={classes.icon} />
        </div>
        {this.renderBookings()}
        {this.renderLendings()}
      </div>
    );
  };
}

class Withdraw2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      // bookings: [],
      // TEST:
      bookings: [],
      error: null,
      showBookingCancelSuccess: false
    };
    this.onCancelBooking = this.onCancelBooking.bind(this);
    this.onSubmitStaffId = this.onSubmitStaffId.bind(this);
  }

  componentDidMount = async () => {
    const userInfo = await ApiClient.instance.callApi(
      "/auth/user",
      "POST",
      {},
      {},
      { Authorization: "Bearer " + this.props.accountInfo.jwtIdToken },
      { Email: this.props.accountInfo.account.userName },
      null,
      [],
      ["application/x-www-form-urlencoded"],
      ["application/json"],
      Object,
      null
    );
    console.log(userInfo);
    await this.setState({
      staffId: userInfo.StaffId
    });
    this.setState({ bookings: await OfficeBookingApi.getBookingsByUserID(this.state.staffId) });
    console.log(this.state.staffId);
  };

  async onSubmitStaffId() {
    console.log(this.state.staffId);
    const staffId = this.state.staffId;
    console.log(staffId);
    const data = await OfficeBookingApi.getBookingsByUserID(staffId);
    console.log(data);
    this.setState({ bookings: data });
    console.log(this.state.bookings);
    console.log(this.state.bookings.length);
    // , (error, data) => {
    //   if (error) {
    //     console.log("Got an error from API call");
    //     this.setState({
    //       error: error,
    //       bookings: []
    //     });
    //     return;
    //   }
    //   if (data) {
    //     console.log(data);
    //     this.setState({
    //       error: null
    //       // bookings: data
    //     });
    //   }
    // });
  }

  onCancelBooking(id) {
    console.log("handle delete");
    this.api.cancelBooking(id, error => {
      if (error) {
        this.setState({
          error: error,
          bookings: []
        });
      } else {
        // 200
        this.setState({
          showBookingCancelSuccess: true
        });
      }
    });
  }

  onAcknowledgeCanceled() {
    this.setState({ showBookingCancelSuccess: false });
  }
  handleBooking(bookings) {
    console.log(bookings);
    if (bookings.length == 0) {
      console.log("HEY");
      return <NoBooking />;
    } else {
      return <ManageTable rows={bookings} />;
    }
  }

  render() {
    const { classes } = this.props;
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return (
      <div>
        <Link href="/">
          <HomeIcon className={`${classes.shapeFilter}`} />
        </Link>
        <div className={`${classes.lendingHistory}`}>
          <Display_SmallSquare staffIdFromMain={this.state.staffId} />
        </div>
        {/*<form onSubmit={this.onSubmitStaffId} className={`${classes.idSearch}`}>*/}
        {/*<TextField*/}
        {/*onKeyPress={e => this.setState({ staffId: e.target.value })}*/}
        {/*type="text"*/}
        {/*label="ID"*/}
        {/*name="staffId"*/}
        {/*/>*/}
        {/*</form>*/}
        {/*<Button  className={`${classes.searchIcon}`} onClick={ ()=>{*/}
        {/*this.onSubmitStaffId();*/}
        {/*}}>My Booking History</Button>*/}
        <h2 style={{ position: "absolute", top: "32%", left: "3%" }}>My Booking History</h2>
        <div className={`${classes.bookingTable}`}>
          {/*<NoBooking/>*/}
          {/*<div className={`${classes.bookingTable}`}>*/}
          <ManageTable rows={this.state.bookings} />
          {/*{this.state.length==0 &&*/}
          {/*<NoBooking/>}*/}
          {/*{this.handleBooking(this.state.bookings)}*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

const withdrawSty = {
  idSearch: {
    position: "absolute",
    top: "33%",
    left: "5%",
    right: "73.61%"
  },
  shapeFilter: {
    position: "absolute",
    left: "2.08%",
    right: "96.53%",
    top: "3.33%",
    bottom: "94.44%",
    color: "#0A65FF"
  },
  searchIcon: {
    position: "absolute",
    left: "3%",
    top: "36%",
    color: "gray"
  },
  searchBar: {
    position: "absolute",
    left: "5.56%",
    right: "73.61%",
    top: "2.22%",
    bottom: "93.33%",
    background: " #DAE1EC",
    borderRadius: "4px"
  },
  bookingTable: {
    position: "absolute",
    top: "40%",
    left: "0%",
    right: "0%"
  },
  lendingHistory: {
    position: "absolute",
    top: "9%"
  }
};

export default withStyles(styles)(Withdraw);
