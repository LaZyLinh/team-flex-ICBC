/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { getAdminToken } from "../api/AdminApi";
import OfficeBookingApi from "../api/OfficeBookingApi";
import FormDialog from "./display/Popup_window";
import Display_Square from "./display/Display_Square";
import AddLocation from "./adminPage/AddLocation";

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      windowOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Admin Page</h1>
        </div>
        <AddLocation locations={this.state.locations} />
        <div className={`${classes.showLocationsStyle}`}>
          <Display_Square />
        </div>
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
  },
  showLocationsStyle: {
    position: "absolute",
    top: "30%"
  }
};

export default withStyles(muiStyles)(AdminPage);
