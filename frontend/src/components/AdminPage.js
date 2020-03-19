import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
<<<<<<< HEAD

class AdminPage extends React.Component {
=======
import OfficeBookingApi from "../api/OfficeBookingApi";
import Display_Square from "./Display_Square";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }
  // getAllLoc() {
  //   console.log("hey");
  //   let allLocationsP = OfficeBookingApi.getLocations();
  //   let allLocation;
  //   Promise.all([allLocationsP]).then(eachLoc => {
  //     this.setState({ locations: eachLoc[0] });
  //     console.log(this.state.locations);
  //   });
  // }
>>>>>>> parent of f1c6f28... without add location Admin Main page
  render() {
    const { classes } = this.props;
    // let allLoc;
    // const allLocP = OfficeBookingApi.getLocations();
    // Promise.all([allLocP]).then(messages => {
    //   // console.log(messages);
    //   allLoc = messages[0];
    //   console.log(allLoc);
    // });
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Edit</h1>
        </div>
        <div className={`${classes.searchCellStyle}`}>
          <div className={`${classes.searchBarStyle}`}>
            <TextField style={{ position: "absolute", top: "7px", left: "20%" }} />
            <SearchIcon style={{ fontSize: "34px", position: "absolute", top: "5px", left: "3%" }} />
          </div>
          <div className={`${classes.addLocationStyle}`}>
            <h1 style={{ color: "white", position: "absolute", left: "10%", top: "0%", fontSize: "30px" }}>Location</h1>
            <AddCircleOutlineIcon
              style={{ color: "white", position: "absolute", right: "10%", bottom: "10%", fontSize: "40px" }}
            />
          </div>
        </div>
<<<<<<< HEAD
=======
        <div className={`${classes.showLocationsStyle}`}>
          <Display_Square/>
        </div>
>>>>>>> parent of f1c6f28... without add location Admin Main page
      </React.Fragment>
    );
  }
}
const muiStyles = {
  headerStyle: {
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "0px",
    height: "100px",
    backgroundColor: "#002D7D"
  },
  searchCellStyle: {
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "100px",
    height: "70px",
    backgroundColor: "#DAE1EC"
  },
  searchBarStyle: {
    position: "absolute",
    left: "2.78%",
    top: "20px",
    height: "38px",
    right: "82%",
    backgroundColor: "white",
    borderRadius: "10px"
  },
  addLocationStyle: {
    backgroundColor: "#0048A8",
    position: "absolute",
    left: "82%",
    right: "2%",
    height: "55px",
    top: "7px",
    borderRadius: "20px"
  }
};

export default withStyles(muiStyles)(AdminPage);
