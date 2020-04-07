import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import Slide from "@material-ui/core/Slide";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GiDesk } from "react-icons/gi";
import Button from "@material-ui/core/Button";
import OfficeBookingApi from "../api/OfficeBookingApi";
import ApiClient from "../ApiClient";
import featureMap from "../api/FeatureMap";
import { DateRange } from "react-date-range";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import styles from "../styles/Booking.styles";
import logo from "../assets/home_logo.png";
import bookedDates from "../api/BookedDates";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      location: "",
      locations: [],
      floor: "",
      floorId: 0,
      floors: [],
      disabledDates: [], // Obtained from api/BookedDates
      startDate: new Date(),
      endDate: new Date(),
      features: [],
      fm: {},
      packages: [],
      bookings: [],
      openDialog: false,
      error: false,
      errorText: "",
      redirectHome: false,
      time: {},
      seconds: 1200,
      confirmed: false,
      imgUrl: "",
      openModal: false,
      updateTime: new Date()
    };
    this.timer = 0;
  }

  componentDidMount = async () => {
    const reqs = [
      OfficeBookingApi.getLocations(),
      OfficeBookingApi.getFeatures(),
      featureMap(),
      ApiClient.instance.callApi(
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
      )
    ];
    const results = await Promise.all(reqs);
    const features = results[1].map(f => {
      return {
        name: f,
        checked: false
      };
    });
    const staffId = results[3].StaffId;
    const disabledDates = await bookedDates(staffId);
    this.setState({
      locations: results[0],
      features,
      fm: results[2],
      staffId,
      disabledDates
    });
    const sdStr = this.state.startDate.toISOString().slice(0, 10);
    const edStr = this.state.endDate.toISOString().slice(0, 10);
    const res = await OfficeBookingApi.getPackages(sdStr, edStr);
    this.setState({ packages: res });
  };

  handleDateChange = async dateRange => {
    this.setState(
      {
        startDate: dateRange.selection.startDate,
        endDate: dateRange.selection.endDate
      },
      async () => {
        await this.updatePackages();
      }
    );
  };

  handleSelectLocation = async event => {
    this.setState({ location: event.target.value, floor: "", floorId: 0 });
    const floors = await OfficeBookingApi.getFloors({ location: event.target.value });
    this.setState({ floors });
    await this.updatePackages();
  };

  handleSelectFloor = async (event, child) => {
    for (const floor of this.state.floors) {
      if (parseInt(child.key) === floor.floorId) {
        this.setState({ floor: `${floor.prefix} Floor ${floor.floorNo}`, floorId: floor.floorId });
        await this.updatePackages();
      }
    }
  };

  handleCheckFeature = async event => {
    this.setState(
      {
        features: this.state.features.map(f => {
          if (f.name === event.target.value) {
            return {
              name: f.name,
              checked: !f.checked
            };
          } else {
            return f;
          }
        })
      },
      async () => {
        await this.updatePackages();
      }
    );
  };

  handleClickBooking = async event => {
    const reqs = [];
    const i = event.currentTarget.dataset.id - 1;
    for (const avail of this.state.packages[i]) {
      reqs.push(OfficeBookingApi.lockBooking(avail.availabilityId, this.state.staffId, avail.startDate, avail.endDate));
    }
    try {
      const results = await Promise.all(reqs);
      this.setState({
        bookings: results,
        openDialog: true
      });
    } catch (err) {
      this.setState({ error: true, errorText: "Could not book. Try again." });
      await this.updatePackages();
    }
  };

  handleClickFloorPlan = async event => {
    const i = event.currentTarget.dataset.id;
    const floorId = ((parseInt(i) % 4) + 1).toString();

    this.setState({
      openModal: true,
      imgUrl: `https://icbcflexwork.me:8080/floorplans/${floorId}.jpg`
    });
  };

  handleCloseFloorPlan = event => {
    this.setState({
      openModal: false,
      imgUrl: ""
    });
  };

  handleCancelBooking = async event => {
    const reqs = [];
    for (const booking of this.state.bookings) {
      reqs.push(OfficeBookingApi.unlockBooking(booking.bookingId));
    }
    try {
      await Promise.all(reqs);
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({ openDialog: false, booking: [], time: {}, seconds: 1200 });
    } catch (err) {
      this.refresh();
      console.error(`Couldn't cancel booking ${err}`);
    }
  };

  handleConfirmBooking = async event => {
    const reqs = [];
    for (const booking of this.state.bookings) {
      reqs.push(OfficeBookingApi.createBooking(booking.bookingId));
    }
    try {
      await Promise.all(reqs);
      this.setState({ openDialog: false, booking: [], confirmed: true });
    } catch (err) {
      console.error(`Couldn't cancel booking ${err}`);
    }
  };

  updatePackages = async () => {
    const sdStr = this.state.startDate.toISOString().slice(0, 10);
    const edStr = this.state.endDate.toISOString().slice(0, 10);
    const features = [];
    for (const f of this.state.features) {
      if (f.checked) {
        features.push(this.state.fm[f.name]);
      }
    }
    let floorIds = [];
    if (this.state.floor) {
      floorIds = this.state.floors.filter(f => f.floorId === this.state.floor.floorId);
    } else if (this.state.location) {
      floorIds = this.state.floors.map(f => f.floorId);
    }
    const reqTime = new Date();
    this.setState({ updateTime: reqTime });
    const results = await OfficeBookingApi.getPackagesTimed(reqTime, sdStr, edStr, { floorIds, features });
    if (results.time.getTime() === this.state.updateTime.getTime()) {
      this.setState({ packages: results.packages });
    }
  };

  getLocationItems = () => {
    let menuItems = [];
    let i = 0;
    for (const location of this.state.locations) {
      menuItems.push(
        <MenuItem value={location} key={i++}>
          {location}
        </MenuItem>
      );
    }
    return menuItems;
  };

  getFloorItems = () => {
    let menuItems = [];
    for (const floor of this.state.floors) {
      menuItems.push(
        <MenuItem
          value={`${floor.prefix} Floor ${floor.floorNo}`}
          key={floor.floorId}
        >{`${floor.prefix} Floor ${floor.floorNo}`}</MenuItem>
      );
    }
    return menuItems;
  };

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      this.refresh();
    }
  };

  secondsToTime = secs => {
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
  };

  redirectIfConfirmed = () => {
    if (this.state.confirmed) {
      return <Redirect to={{ pathname: "/finished" }} />;
    }
  };

  refresh = () => {
    window.location.reload();
  };

  render = () => {
    const { classes } = this.props;
    return (
      this.redirectIfConfirmed() || (
        <div>
          <div className={classes.header}>
            <Link href="/">
              <img className={classes.logo} src={logo} alt="Logo"></img>
            </Link>
            <div className={classes.title}>BOOKING</div>
            <GiDesk className={classes.icon} />
          </div>
          <div className={classes.leftPanel}>
            <DateRange
              scroll={{ enabled: true, monthHeight: 190 }}
              className={`${classes.calendar}`}
              direction="vertical"
              fixedHeight={false}
              editableDateInputs={false}
              onChange={this.handleDateChange}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              disabledDates={this.state.disabledDates}
              ranges={[
                {
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  key: "selection",
                  color: "#0048a8d9"
                }
              ]}
            />
            <FormControl variant="filled" className={classes.locationInput}>
              <InputLabel id="location">Location</InputLabel>
              <Select labelId="location" value={this.state.location} onChange={this.handleSelectLocation}>
                {this.getLocationItems()}
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.floorInput}>
              <InputLabel id="floor">Floor</InputLabel>
              <Select labelId="floor" value={this.state.floor} onChange={this.handleSelectFloor}>
                {this.getFloorItems()}
              </Select>
            </FormControl>
            <div className={classes.featureSelection}>
              {this.state.features.map((feature, i) => {
                return (
                  <FormControlLabel
                    className={`${classes.featureLabel}`}
                    control={
                      <Checkbox value={feature.name} onChange={this.handleCheckFeature} checked={feature.checked} />
                    }
                    label={feature.name}
                    key={i}
                  />
                );
              })}
            </div>
            <div className={classes.pkgsContainer}>{this.renderPackages(classes)}</div>
          </div>
          {this.renderConfirmationDailog(classes)}
          {this.renderFloorPlanModal(classes)}
        </div>
      )
    );
  };

  renderFloorPlanModal = classes => {
    return (
      <Modal
        open={this.state.openModal}
        onClose={this.handleCloseFloorPlan}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Zoom>
          <img src={this.state.imgUrl} alt="Floor Plan" height="500" width="700"></img>
        </Zoom>
      </Modal>
    );
  };

  renderConfirmationDailog = classes => {
    if (this.state.openDialog) {
      this.startTimer();
    }
    return (
      <Dialog
        TransitionComponent={Transition}
        open={this.state.openDialog}
        onClose={this.handleCancelBooking}
        PaperProps={{
          style: {
            backgroundColor: "#EBF2FF"
          }
        }}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography={true}>
          Confirm Booking
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContext}>
            <div className={`${classes.timerText}`}>
              {"Confirm your booking in "}
              {this.state.time.m < 10 ? `0${this.state.time.m}` : this.state.time.m}:
              {this.state.time.s < 10 ? `0${this.state.time.s}` : this.state.time.s}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleConfirmBooking} className={classes.dialogButtons} color="primary">
            Ok
          </Button>
          <Button onClick={this.handleCancelBooking} className={classes.dialogButtons} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderPackages = classes => {
    if (this.state.packages.length === 0) {
      return <div className={`${classes.noAvailText}`}>No availabilities for this filter. Search again.</div>;
    }
    const pkgItems = [];
    let i = 1;
    for (const pkg of this.state.packages) {
      const availItems = [];
      let j = 1;
      for (const availability of pkg) {
        availItems.push(
          <ExpansionPanelDetails key={j}>
            <Card className={classes.availabilityItem}>
              <CardContent>
                <Typography variant="h6" component="h6" className={classes.availTitle} gutterBottom>
                  Availability {j}
                </Typography>
                <Typography>
                  <strong>Start:</strong> {availability.startDate}
                  <br />
                  <strong>End:</strong> {availability.endDate}
                </Typography>
                <Typography className={classes.pos}>
                  <strong>Location: </strong>
                  {`${availability.floor.city} Building ${availability.floor.building} Floor ${availability.floor.floorNo}`}
                  <br />
                  <strong>Workspace:</strong> {availability.workspaceId}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  <strong>Owner comments:</strong> {availability.comment || "None"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleClickFloorPlan} data-id={availability.floor.floorId}>
                  Floor Plan
                </Button>
              </CardActions>
            </Card>
          </ExpansionPanelDetails>
        );
        j++;
      }
      pkgItems.push(
        <ExpansionPanel key={i}>
          <ExpansionPanelSummary className={classes.pkgSummary} expandIcon={<ExpandMoreIcon />}>
            <div className={classes.packageHeading}>
              <Typography variant="h4" component="h4" style={{ fontFamily: "Inter" }}>
                Booking Option #{i}
              </Typography>
            </div>
            <Button
              style={{ position: "absolute", right: "8%", borderColor: "rgb(172, 223, 249)" }}
              onClick={this.handleClickBooking}
              variant="outlined"
              color="primary"
              data-id={i}
              disabled={!this.state.staffId}
            >
              Place booking
            </Button>
          </ExpansionPanelSummary>
          <div className={classes.availContainer}>{availItems}</div>
        </ExpansionPanel>
      );
      i++;
    }
    return pkgItems;
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default withStyles(styles)(Booking);
