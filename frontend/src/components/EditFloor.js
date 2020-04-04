import React from 'react'
import Img from 'react-image'
import Button from "@material-ui/core/Button";
import { TextField, withStyles } from "@material-ui/core";
import { getFloorsByCity } from '../api/AdminApi'
import FloorList from "./admin/FloorList"

// router.post("/upload-floor-data", AdminFloorService.uploadFloorData);
// backend has this which takes a (spread sheet file) and puts the whole floor's data into the database
// https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/wikis/Floor-Data-Upload
// helper function in api/AdminApi for accessing this end point
// Choice 1 - integrate this UI into this page
// Choice 2 - have a button that leads to a page that handles it

class EditFloor extends React.Component {
  constructor() {
    super();
    // TODO get city from url or props
    const vancity = "Vancouver";
    this.state = {
      city: vancity,
      locations: [],
      windowOpen: false
    };
  }

  componentWillMount = async () => {

    const floors = await getFloorsByCity(this.state.city);

    let currentFloor = 0;
    const location = floors[currentFloor].Location
    const currentFloorId = floors[currentFloor].FloorId

    this.setState({
      allFloors: floors,
      currentFloorIndex: currentFloor,
      currentLocation: location,
      currentFloorId: currentFloorId
    })
  }

  getCurrentFloorName() {
    if (this.state.floors) {
      return this.state.floors[this.state.currentFloorIndex].Location;
    }
  }

  handleUploadMap = () => {
    // todo 
  }

  handleUploadCSV = () => {
    // todo
  }

  changeCurrent = (data) => {
    console.log(data)
    this.state.currentFloorIndex = data;
    this.state.currentLocation = this.state.allFloors[data].Location;
    this.state.currentFloorId = this.state.allFloors[data].FloorId;
    this.forceUpdate()
  }

  deleteFloor = (fidx) => {

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
            <img className={`${classes.floorplanImg}`} src={`https://icbcflexwork.me:8080/floorplans/${this.state.currentFloorId}.jpg`} alt="No FloorPlan found" />
            <h3>{this.state.currentLocation}</h3>
            <div className={`${classes.buttens}`}>
            </div>
          </div>
          <div className={`${classes.right}`}>
            <h2>{"Floors in " + this.state.city}</h2>
            <div className={classes.floorBar}>
              <Button className={classes.aButton} onClick={this.handleUploadMap} variant="outlined" color="primary">
                Add new Floor
          </Button>
            </div>
            {this.state.allFloors ? <FloorList floors={this.state.allFloors} callback={this.changeCurrent} deleteCallback={this.deleteFloor} /> : <span>"loading..."</span>}
          </div>
        </div>
      </div>
    )
  }
}

const muiStyles = {
  mainStyle: {
    display: "block"
  },
  floorplanImg: {
    height: "100%",
    width: "100%"
  },
  split: {
    display: "flex",
    width: '100%'
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
    paddingTop: "10%",
    textAlign: "center",
    width: "50%",
    height: "100%",
    left: 0,
  },

  right: {
    width: "50%",
    height: "100%",
    right: 0,
    backgroundColor: "DAE1EC"
  }

}

export default withStyles(muiStyles)(EditFloor);