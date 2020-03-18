import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import { GiCalendar, GiDesk, GiChecklist } from "react-icons/gi";
import styles from "../styles/Home.styles";
import logo from "../assets/home_logo.png";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      password: "",
      wrongPassword: false
    };
  }

  handlePasswordInput = event => {
    this.setState({
      password: event.target.value,
      wrongPassword: false
    });
  };

  handleAdminPortal = () => {
    this.setState(prevState => {
      return { openDialog: !prevState.openDialog };
    });
  };

  handleAdminLogin = () => {
    // TODO: send request to verify password
    // TODO: if request succeeds, redirect to admin portal
    // TODO: if request fails...
    this.setState({
      wrongPassword: true
    });
  };

  render = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.background}></div>
        <div>
          <img className={classes.logo} src={logo} alt="Logo"></img>
          <Button className={classes.adminButton} onClick={this.handleAdminPortal} variant="outlined" color="primary">
            Admin Portal
          </Button>
        </div>
        <Grid container className={classes.container} spacing={2}>
          <Grid className={classes.item} item xs={4}>
            <Button href="/lending" className={classes.button}>
              <div>
                <GiCalendar className={classes.icon} />
                <div className={classes.buttonText}>Lend Office</div>
              </div>
            </Button>
          </Grid>
          <Grid className={classes.item} item xs={4}>
            <Button href="/booking" className={classes.button}>
              <div>
                <GiDesk className={classes.icon} />
                <div className={classes.buttonText}>Book Office</div>
              </div>
            </Button>
          </Grid>
          <Grid className={classes.item} item xs={4}>
            <Button href="/withdraw" className={classes.button}>
              <div>
                <GiChecklist className={classes.icon} />
                <div className={classes.buttonText}>Manage Bookings and Lendings</div>
              </div>
            </Button>
          </Grid>
        </Grid>
        <Dialog
          TransitionComponent={Transition}
          open={this.state.openDialog}
          onClose={this.handleAdminPortal}
          PaperProps={{
            style: {
              backgroundColor: "#EBF2FF"
            }
          }}
        >
          <DialogTitle className={classes.dialogTitle} disableTypography={true}>
            Admin Portal
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.dialogContext}>
              To access the Admin Portal, please enter the admin password.
            </DialogContentText>
            <TextField
              className={classes.passwordField}
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={this.state.password}
              onChange={this.handlePasswordInput}
              error={this.state.wrongPassword}
              helperText={this.state.wrongPassword ? "Incorrect Password" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.dialogButtons}
              onClick={this.handleAdminLogin}
              color="primary"
              disabled={this.state.password === ""}
            >
              Login
            </Button>
            <Button className={classes.dialogButtons} onClick={this.handleAdminPortal} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default withStyles(styles)(Home);
