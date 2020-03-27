import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import EventSeatRoundedIcon from "@material-ui/icons/EventSeatRounded";
import TvRoundedIcon from "@material-ui/icons/TvRounded";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { GiCalendar } from "react-icons/gi";
import { DateRange } from "react-date-range";
import OfficeLendingApi from "../api/OfficeLendingApi";
import styles from "../styles/Lending.styles";
import logo from "../assets/home_logo.png";
import ApiClient from "../ApiClient";

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
      openDialog: false,
      redirectHome: false,
      hasNoWorkspace: true,
      error: false,
      warning: false
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
    this.setState({
      staffId: userInfo.StaffId,
      location: userInfo.Location || "N/A",
      workspace: userInfo.WorkspaceId || "N/A",
      features: userInfo.features || [],
      hasNoWorkspace: !userInfo.WorkspaceId,
      warning: !userInfo.WorkspaceId
    });
  };

  getFeatures = () => {
    if (this.state.features.length > 0) {
      this.state.features.reduce((str, feature, i) => {
        if (i === 0) {
          return feature;
        } else {
          return `${str}, ${feature}`;
        }
      }, "");
    } else {
      return "N/A";
    }
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
    const { workspace, comment } = this.state;
    try {
      await OfficeLendingApi.createAvailability(sdStr, edStr, workspace, { comment });
      this.setState({ openDialog: true });
    } catch (err) {
      console.error("createAvailability: " + err);
      this.setState({ error: true });
    }
  };

  handleCloseAlert = () => {
    this.setState({
      error: false
    });
  };

  handleCloseWarning = () => {
    this.setState({
      warning: false
    });
  };

  redirectHome = () => {
    this.setState({
      redirectHome: true
    });
  };

  render = () => {
    const { classes } = this.props;

    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className={`${classes.bg}`}></div>
        <div className={classes.header}>
          <Link href="/">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
          <div className={classes.title}>LENDING</div>
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
          minDate={new Date()}
          ranges={[
            {
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              key: "selection",
              color: "#0048a8d9"
            }
          ]}
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
              value={this.getFeatures()}
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
              disabled={this.state.hasNoWorkspace}
              onClick={this.handleConfirmAvailability}
              className={`${classes.label} ${classes.btn} ${classes.btn1}`}
              variant="contained"
              endIcon={<ArrowForwardOutlinedIcon></ArrowForwardOutlinedIcon>}
            >
              Confirm Availability
            </Button>
          </Grid>
        </Grid>
        {this.renderConfirmationDailog(classes)}
        <Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleCloseAlert}>
          <Alert severity="error" onClose={this.handleCloseAlert}>
            There was an error confirming your availability.
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.warning} autoHideDuration={6000} onClose={this.handleCloseWarning}>
          <Alert severity="warning" onClose={this.handleCloseWarning}>
            You have no workspace assigned. Cannot lending office.
          </Alert>
        </Snackbar>
      </div>
    );
  };

  renderConfirmationDailog = classes => {
    return (
      <Dialog
        TransitionComponent={Transition}
        open={this.state.openDialog}
        onClose={this.redirectHome}
        PaperProps={{
          style: {
            backgroundColor: "#EBF2FF"
          }
        }}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography={true}>
          Lend Office
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContext}>
            The office availability has been created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.redirectHome} className={classes.dialogButtons} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default withStyles(styles)(Lending);
