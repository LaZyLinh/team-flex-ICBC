import React from "react";
import { withStyles } from "@material-ui/core";
import ManageTable from "./display/ManageTable";
import OfficeBookingApi from "../api/OfficeBookingApi";
import OfficeLendingApi from "../api/OfficeLendingApi";
import { GiChecklist } from "react-icons/gi";
import styles from "../styles/Withdraw.styles";
import logo from "../assets/home_logo.png";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ApiClient from "../ApiClient";

import Axios from "axios";
import { BASE_URL } from "../api/BaseUrl";

const axios = Axios.create({
  baseURL: BASE_URL
});

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
      axios.get(`/bookings?staffId=${userInfo.StaffId}`),
      OfficeLendingApi.getAvailabilitiesByOwnerID(userInfo.StaffId)
    ];
    const results = await Promise.all(reqs);
    const confirmedBookings = [];
    console.table(results[0]);
    for (const booking of results[0].data) {
      if (booking.Confirmed) {
        confirmedBookings.push(booking);
      }
    }
    this.setState({
      bookings: confirmedBookings,
      lendings: results[1]
    });
  };

  handleDeleteLending = async event => {
    const i = event.currentTarget.dataset.id - 1;
    await OfficeLendingApi.cancelAvailability(this.state.lendings[i].availabilityId);
    this.setState({
      lendings: await OfficeLendingApi.getAvailabilitiesByOwnerID(this.state.staffId)
    });
  };

  renderBookings = classes => {
    return (
      <React.Fragment>
        <Typography
          style={{
            position: "absolute",
            top: "55px",
            left: "2%",
            fontFamily: "Inter",
            color: "rgba(0, 72, 168, 0.85)"
          }}
          variant="h4"
          component="h4"
        >
          Bookings
        </Typography>
        <div className={`${classes.bookingTable}`}>
          <ManageTable rows={this.state.bookings} />
        </div>
      </React.Fragment>
    );
  };

  renderLendings = classes => {
    const items = [];
    let i = 1;
    for (const availability of this.state.lendings) {
      items.push(
        <ExpansionPanelDetails key={i}>
          <Card className={classes.availabilityItem}>
            <CardContent>
              <Typography variant="h6" component="h6" className={classes.availTitle} gutterBottom>
                Availability {i}
              </Typography>
              <Typography>
                <strong>Start:</strong> {availability.startDate.toISOString().slice(0, 10)}
                <br />
                <strong>End:</strong> {availability.endDate.toISOString().slice(0, 10)}
              </Typography>
              <Typography className={classes.pos}>
                <strong>Location: </strong> {availability.location}
                <br />
                <strong>Workspace:</strong> {availability.workspaceId}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                <strong>Owner comments:</strong> {availability.comment || "None"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.handleDeleteLending} data-id={i}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </ExpansionPanelDetails>
      );
      i++;
    }
    return (
      <div className={classes.pkgsContainer}>
        <ExpansionPanel expanded>
          <ExpansionPanelSummary className={classes.pkgSummary}>
            <div className={classes.packageHeading}>
              <Typography variant="h4" component="h4" style={{ fontFamily: "Inter" }}>
                Lendings
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <div className={classes.availContainer}>{items}</div>
        </ExpansionPanel>
      </div>
    );
  };

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
        {this.renderBookings(classes)}
        {this.renderLendings(classes)}
      </div>
    );
  };
}

export default withStyles(styles)(Withdraw);
