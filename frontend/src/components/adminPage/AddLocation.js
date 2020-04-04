import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

export default class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    const locations = props.locations;
    this.state = {
      openMessage: false,
      state: "blank",
      locations,
      location: ""
    };
  }

  handleOnClick() {
    // do something
    const locationTrimmed = this.state.location.trim();
    if (this.state.locations.includes(locationTrimmed)) {
      // Don't let user do it
    }
  }

  dialogText() {
    if (this.state.state === "blank") {
      //
    }
  }

  render() {
    return (
      <React.Fragment>
        <TextField id="newLocationName" style={{ position: "absolute", top: "120px", left: "50%", width: "19.5%" }} />
        <Button
          variant="outlined"
          color="primary"
          style={{ position: "absolute", top: "120px", left: "70%", width: "10%" }}
          onClick={this.handleOnClick}
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
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>{this.dialogText()}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button>OK</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
