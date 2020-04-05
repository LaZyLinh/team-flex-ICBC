import React from "react";
import Img from "react-image";
import Button from "@material-ui/core/Button";
import { TextField, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { getFloorsByCity } from "../api/AdminApi";
import FloorList from "./admin/FloorList";
import Popup from "reactjs-popup";

// router.post("/upload-floor-data", AdminFloorService.uploadFloorData);
// backend has this which takes a (spread sheet file) and puts the whole floor's data into the database
// https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/wikis/Floor-Data-Upload
// helper function in api/AdminApi for accessing this end point
// Choice 1 - integrate this UI into this page
// Choice 2 - have a button that leads to a page that handles it

class EditFloor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.locationName,
      locations: [],
      windowOpen: false,
      openDialog: false
    };
  }

  componentWillMount = async () => {
    const floors = await getFloorsByCity(this.state.city);
    if (!floors) {
      alert("an error occured!")
    }
    let currentFloor = 0;
    const location = floors[currentFloor] ? floors[currentFloor].Location : "N/A";
    const currentFloorId = floors[currentFloor] ? floors[currentFloor].FloorId : 0;

    this.setState({
      allFloors: floors,
      currentFloorIndex: currentFloor,
      currentLocation: location,
      currentFloorId: currentFloorId
    });
  };

  getCurrentFloorName() {
    if (this.state.floors) {
      return this.state.floors[this.state.currentFloorIndex].Location;
    }
  }


  changeCurrent = data => {
    this.state.currentFloorIndex = data;
    this.state.currentLocation = this.state.allFloors[data].Location;
    this.state.currentFloorId = this.state.allFloors[data].FloorId;
    this.forceUpdate();
  };

  deleteFloor = (fidx) => {
    console.log(fidx);
    if (window.confirm(`Are you sure you wish to delete Floor ${this.state.allFloors[fidx].FloorId} in ${this.state.allFloors[fidx].Location}? All workspaces and Lendings on that floor will be deleted.`)) {
      console.log("click yes");
      // TODO request delete
      this.forceUpdate();
    }
  }

  addFloorHandler = () => {
    this.setState({ openDialog: true })
  }

  handleClosePopup = () => {
    this.setState(prevState => {
      return { openDialog: !prevState.openDialog };
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.mainStyle}`}>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Edit Floor</h1>
        </div>
        <div className={`${classes.split}`}>
          <div className={`${classes.left}`}>
            <img
              className={`${classes.floorplanImg}`}
              src={`https://icbcflexwork.me:8080/floorplans/${this.state.currentFloorId}.jpg`}
              alt="No FloorPlan found"
            />
            <h3>{this.state.currentLocation}</h3>
            <div className={`${classes.buttens}`}></div>
          </div>
          <div className={`${classes.right}`}>
            <h2>{"Floors in " + this.state.city}</h2>
            <div className={classes.floorBar}>
              <Button className={classes.aButton} onClick={this.addFloorHandler} variant="outlined" color="primary">
                Add new Floor
              </Button>
              <Dialog
                TransitionComponent={Transition}
                open={this.state.openDialog}
                onClose={this.handleClosePopup}
                PaperProps={{
                  style: {
                    backgroundColor: "#EBF2FF"
                  }
                }}>
                <DialogTitle className={classes.dialogTitle} disableTypography={true}>
                  Add New Floor
                 </DialogTitle>
                <form className={classes.addFloorForm} onSubmit={this.handleNewFloor}>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Floor Number</p>
                    <input
                      variant="filled"
                      type="number"
                      margin="none"
                      className={`${classes.field}`}
                      value={this.state.comment} required
                    ></input>
                  </div>

                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Location</p>
                    <input
                      variant="filled"
                      margin="none"
                      className={`${classes.field}`}
                      value={this.state.comment} required
                    ></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>City</p>
                    <input
                      variant="filled"
                      margin="none"
                      className={`${classes.field}`}
                      value={this.state.city}
                      readonly></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Building Number</p>
                    <input
                      variant="filled"
                      type="number"
                      margin="none"
                      className={`${classes.field}`} required
                    ></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <label style={{ width: "30%" }}>Floor Plan</label>
                    <input
                      type="file" name="file"
                      margin="none"
                      className={`${classes.field}`} required></input>
                  </div>
                  <button style={{ display: "flex", margin: "10px 10px 10px 10px" }}>submit</button>
                </form>
              </Dialog>

            </div>
            {this.state.allFloors ? <FloorList floors={this.state.allFloors} callback={this.changeCurrent} deleteCallback={this.deleteFloor} /> : <span>"loading..."</span>}
          </div>
        </div>
      </div>
    );
  }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const muiStyles = {
  mainStyle: {
    display: "block"
  },
  field: {
    background: "#f8f8f8",
    borderRadius: "2px",
    margin: "10px 10px",
  },
  addFloorForm: {
    width: "400px"
  },
  dialogTitle: {
    fontFamily: "Inter",
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  floorplanImg: {
    height: "100%",
    width: "100%"
  },

  popContainer: {
    position: "fixed",
    zIndex: 1
  },
  split: {
    display: "flex",
    width: "100%"
  },
  floorBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DAE1EC",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "right"
  },
  buttens: {
    display: "inline-grid"
  },

  aButton: {
    color: "#002D7D",
    border: "1px solid rgba(10, 101, 255, 0.5)",
    top: "10%",
    boxShadow: "0px 1px 1px",
    paddingBottom: "10px",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)"
    }
  },

  headerStyle: {
    display: "block",
    position: "relative",
    left: "0px",
    right: "0px",
    top: "0px",
    height: "100px",
    width: "100%",
    backgroundColor: "#002D7D"
  },

  left: {
    boxAlign: "center",
    paddingTop: "5%",
    textAlign: "center",
    width: "50%",
    height: "100%",
    left: 0
  },

  right: {
    width: "50%",
    height: "100%",
    right: 0,
    backgroundColor: "DAE1EC"
  }
};

export default withStyles(muiStyles)(EditFloor);
