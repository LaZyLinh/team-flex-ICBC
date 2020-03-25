import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "../styles/Lending.styles";
import logo from "../assets/home_logo.png";
import Button from "@material-ui/core/Button";
import { GiCalendar } from "react-icons/gi";
import { ArrowForwardOutlined } from "@material-ui/icons";
import OfficeLendingApi from "../api/OfficeLendingApi";
import { DateRange } from "react-date-range";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import EventSeatRoundedIcon from "@material-ui/icons/EventSeatRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";

class Lending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      location: "",
      workspace: "",
      features: [],
      comment: "",
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    };
  }

  componentDidMount = async () => {
    // TODO: API request to get following user info
    this.setState({
      staffId: "4321",
      location: "North Vancouver",
      workspace: "X12",
      features: ["TV", "Private", "iPad"]
    });
  };

  handleDateChange = dateRange => {
    this.setState({
      startDate: dateRange.selection.startDate,
      endDate: dateRange.selection.endDate
    });
  };

  handleCommentChange = event => {
    this.setState({
      comment: event.target.value
    });
  };

  handleConfirmAvailability = async () => {
    const sdStr = this.state.startDate.toISOString().slice(0, 10);
    const edStr = this.state.endDate.toISOString().slice(0, 10);
    const workspaceId = this.state.workspaceId;
    try {
      await OfficeLendingApi.createAvailability(sdStr, edStr, workspaceId);
      console.log("createAvailability: 200 OK!");
    } catch (err) {
      console.error("createAvalability: " + err);
    }
  };

  render = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={`${classes.bg}`}></div>
        <div className={classes.header}>
          <Link href="/">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
          <div className={classes.title}>Lend Office</div>
          <GiCalendar className={classes.icon} />
        </div>
        <DateRange
          scroll={{ enabled: true, monthHeight: 300 }}
          className={`${classes.calendar}`}
          direction="vertical"
          fixedHeight={false}
          editableDateInputs={false}
          onChange={this.handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={[this.state]}
        />
        <Grid className={`${classes.box}`} direction="column" container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Staff ID"
              variant="filled"
              margin="none"
              className={`${classes.field} ${classes.field1}`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityRoundedIcon />
                  </InputAdornment>
                )
              }}
              value={this.state.staffId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              variant="filled"
              margin="none"
              className={`${classes.field} ${classes.field2}`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomRoundedIcon />
                  </InputAdornment>
                )
              }}
              value={this.state.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Workspace"
              variant="filled"
              margin="none"
              className={`${classes.field} ${classes.field3}`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EventSeatRoundedIcon />
                  </InputAdornment>
                )
              }}
              value={this.state.workspace}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Features"
              variant="filled"
              margin="none"
              className={`${classes.field} ${classes.field4}`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <TvRoundedIcon />
                  </InputAdornment>
                )
              }}
              value={this.state.features.reduce((str, feature, i) => {
                if (i === 0) {
                  return feature;
                } else {
                  return `${str}, ${feature}`;
                }
              }, "")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comment"
              variant="filled"
              margin="none"
              className={`${classes.field} ${classes.field5}`}
              multiline
              rows="4"
              value={this.state.comment}
              onChange={this.handleCommentChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={this.handleConfirmAvailability}
              className={`${classes.label} ${classes.btn} ${classes.btn1}`}
              variant="contained"
              href="/finished"
              endIcon={<ArrowForwardOutlined></ArrowForwardOutlined>}
            >
              Confirm Availability
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styles)(Lending);
