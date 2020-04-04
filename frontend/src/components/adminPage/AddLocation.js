import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    const locations = props.locations;
    this.state = {
      openMessage: false,
      locations,
      location: ""
    }
  }

  handleOnClick() {
    // do something
    const locationTrimmed = this.state.location.trim()
    if (locations.includes(locationTrimmed)) {
      // Don't let user do it

    }
  }

  render() {
    return (
      <React.Fragment>
        <TextField id="newLocationName" style={{ position: "absolute", top: "120px", left: "50%", width: "19.5%" }} />
        <Button
          variant="contained"
          color="primary"
          style={{ position: "absolute", top: "120px", left: "70%", width: "10%" }}
          onClick={handleOnClick}
        >
          + Location
        </Button>
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
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
