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
import { getFloorsByCity, addFloor, deleteFloor } from "../api/AdminApi";
import FloorList from "./admin/FloorList";
import Popup from "reactjs-popup";
import logo from "../assets/home_logo.png";
import Link from "@material-ui/core/Link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// router.post("/upload-floor-data", AdminFloorService.uploadFloorData);
// backend has this which takes a (spread sheet file) and puts the whole floor's data into the database
// https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/wikis/Floor-Data-Upload
// helper function in api/AdminApi for accessing this end point
// Choice 1 - integrate this UI into this page
// Choice 2 - have a button that leads to a page that handles it

const EDIT_WORKSPACE_PATH = "/editWorkspace/";

class EditFloor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.locationName,
      locations: [],
      windowOpen: false,
      openDialog: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentWillMount = async () => {
    const floors = await getFloorsByCity(this.state.city);
    if (!floors) {
      alert("an error occured!");
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

  deleteFloor = async fidx => {
    console.log(fidx);
    if (
      window.confirm(
        `Are you sure you wish to delete Floor ${this.state.allFloors[fidx].FloorId} in ${this.state.allFloors[fidx].Location}? All workspaces and Lendings on that floor will be deleted.`
      )
    ) {
      console.log("click yes");
      await deleteFloor(this.state.allFloors[fidx].FloorId);
      window.location.reload();
    }
  };

  editFloor = index => {
    const id = this.state.allFloors[index].FloorId;
    window.location.href = EDIT_WORKSPACE_PATH + id;
  };

  addFloorHandler = () => {
    this.setState({ openDialog: true });
  };

  handleClosePopup = () => {
    this.setState(prevState => {
      return { openDialog: !prevState.openDialog };
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = "new" + target.name;
    if (name && value) {
      this.setState({
        [name]: value
      });
    }
  }

  handleFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  handleSubmit = event => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("floorNo", this.state.newFloorNo);
    bodyFormData.append("building", this.state.newBuilding);
    bodyFormData.append("city", this.state.city);
    bodyFormData.append("location", this.state.newLocation);
    bodyFormData.append("floorPlanImg", this.state.file);

    addFloor(bodyFormData)
      .then(rsp => {
        console.log(rsp);
        this.setState({ errMsg: "" });
        this.setState(prevState => {
          return { openDialog: !prevState.openDialog };
        });
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        this.setState({ errMsg: "there is an error adding floors" });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.mainStyle}`}>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Edit Floor</h1>
          <Link href="/adminPage">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
        </div>
        <div className={`${classes.split}`}>
          <div className={`${classes.left}`}>
            <Zoom>
              <img
                className={`${classes.floorplanImg}`}
                src={`https://icbcflexwork.me:8080/floorplans/${this.state.currentFloorId}.jpg`}
                width="40%"
                alt="No FloorPlan found"
              />
            </Zoom>
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
                }}
              >
                <DialogTitle className={classes.dialogTitle} disableTypography={true}>
                  Add New Floor
                </DialogTitle>
                <form className={classes.addFloorForm} onSubmit={this.handleSubmit}>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Floor Number</p>
                    <input
                      name="FloorNo"
                      variant="filled"
                      type="number"
                      margin="none"
                      className={`${classes.field}`}
                      onChange={this.handleInputChange}
                      value={this.state.comment}
                      required
                    ></input>
                  </div>

                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Location</p>
                    <input
                      name="Location"
                      variant="filled"
                      margin="none"
                      className={`${classes.field}`}
                      onChange={this.handleInputChange}
                      value={this.state.comment}
                      required
                    ></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>City</p>
                    <input
                      name="City"
                      variant="filled"
                      margin="none"
                      className={`${classes.field}`}
                      value={this.state.city}
                      onChange={this.handleInputChange}
                      readonly
                    ></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <p style={{ width: "30%" }}>Building Number</p>
                    <input
                      name="Building"
                      variant="filled"
                      type="number"
                      onChange={this.handleInputChange}
                      margin="none"
                      className={`${classes.field}`}
                      required
                    ></input>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <label style={{ width: "30%" }}>Floor Plan</label>
                    <input
                      name="FloorPlan"
                      type="file"
                      onChange={this.handleFileChange}
                      margin="none"
                      className={`${classes.field}`}
                      required
                    ></input>
                  </div>
                  <button type="submit" style={{ display: "flex", margin: "10px 10px 10px 10px" }}>
                    submit
                  </button>
                  <p style={{ color: "red", paddingLeft: "5%" }}>{this.state.errMsg}</p>
                </form>
              </Dialog>
            </div>
            {this.state.allFloors ? (
              <FloorList
                floors={this.state.allFloors}
                callback={this.changeCurrent}
                editFloorCallback={this.editFloor}
                deleteCallback={this.deleteFloor}
              />
            ) : (
                <span>"loading..."</span>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const inputParsers = {
  date(input) {
    const [month, day, year] = input.split("/");
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const muiStyles = {
  mainStyle: {
    display: "block"
  },
  logo: {
    width: "95px",
    height: "40px",
    position: "absolute",
    right: "1%",
    top: "25%"
  },
  field: {
    background: "#f8f8f8",
    borderRadius: "2px",
    margin: "10px 10px"
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
