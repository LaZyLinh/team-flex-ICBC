/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { withStyles } from "@material-ui/core";
import { getFloorsByCity, deleteLocationName } from "../../api/AdminApi";
import Button from "@material-ui/core/Button";

class EditLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floors: [],
      deleteButtonClicked: false
    };
  }

  async componentDidMount() {
    this.setState({
      floors: await getFloorsByCity(this.props.locationName)
    });
    console.log(this.state.floors);
  }

  floorsToBuildings(floors) {
    const buildings = {}; // map
    for (const floor of floors) {
      const buildingStr = floor.Building;
      if (buildings[buildingStr]) {
        buildings[buildingStr].push(floor);
      } else {
        buildings[buildingStr] = [floor]; // new array
      }
    }
    return buildings;
  }

  showFloors = floors => {
    return floors.map(f => (
      <React.Fragment key={f.FloorId}>
        <div
          style={{
            width: "20%",
            display: "inline-block",
            marginLeft: "10%",
            textAlign: "center"
          }}
        >
          <div style={{ width: "100px", height: "100px", color: "white", backgroundColor: "darkblue" }}>
            <h1 style={{ fontSize: "20px", position: "relative", top: "40%", color: "white" }}>Floor {f.FloorNo}</h1>
          </div>
        </div>
      </React.Fragment>
    ));
  };

  showBuilding = floors => {
    const buildingStr = floors[0].Building;
    return (
      <React.Fragment key={buildingStr}>
        <h3>Building: {buildingStr}</h3>
        {this.showFloors(floors)}
        <br />
        <br />
        <hr />
      </React.Fragment>
    );
  };

  showBuildings = () => {
    if (this.state.floors.length === 0) {
      return <h2>No floors have been added for this location yet.</h2>;
    } else {
      const floors = this.state.floors;
      const buildings = this.floorsToBuildings(floors);
      return Object.values(buildings).map(this.showBuilding);
    }
  };

  onClickDelete = () => {
    this.setState({
      deleteButtonClicked: true
    });
  };

  onClickConfirmDelete = async () => {
    // TODO: fix this -- not sure why this is returning 401 unauthorized
    await deleteLocationName(this.props.locationName);
    window.location.href = "/adminPage";
  };

  showSecondDeleteButtonIfNeeded = () => {
    if (this.state.deleteButtonClicked) {
      return (
        <div style={{ position: "absolute", top: "175px", left: "70%" }}>
          <Button style={{ fontSize: 28 }} variant="contained" color="secondary" onClick={this.onClickConfirmDelete}>
            Confirm Delete?
          </Button>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>
            Admin - Manage Location: <em>{this.props.locationName}</em>
          </h1>
        </div>
        <div style={{ position: "absolute", top: "100px" }}>{this.showBuildings()} </div>
        <div style={{ position: "absolute", top: "120px", left: "70%" }}>
          <Button style={{ fontSize: 15 }} variant="contained" color="secondary" onClick={this.onClickDelete}>
            Delete Entire Location
          </Button>
        </div>
        {this.showSecondDeleteButtonIfNeeded()}
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

export default withStyles(muiStyles)(EditLocation);
