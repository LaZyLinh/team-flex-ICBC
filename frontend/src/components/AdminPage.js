/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { withStyles } from "@material-ui/core";
import Display_Square from "./display/Display_Square";
import AddLocation from "./admin/AddLocation";

import { getLocationNames } from "../api/AdminApi";
import EditFeatures from "./admin/EditFeatures";

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      windowOpen: false
    };
  }

  getLocations = () => {
    return this.state.locations;
  };

  async componentDidMount() {
    await this.updateLocations();
  }

  updateLocations = async () => {
    this.setState({ locations: await getLocationNames() });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>
            Admin Page - Manage Locations
          </h1>
        </div>
        <AddLocation getLocations={this.getLocations} updateLocations={this.updateLocations} />
        <EditFeatures />
        <div className={`${classes.showLocationsStyle}`}>
          <Display_Square locations={this.state.locations} updateLocations={this.updateLocations} />
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
    top: "30%",
    width: "100%"
  }
};

export default withStyles(muiStyles)(AdminPage);
