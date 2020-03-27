import React from "react";
import OfficeBookingApi from "../../api/OfficeBookingApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

class Display_Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Locations: []
    };
    this.getLocations = this.getLocations.bind(this);
  }
  async getLocations() {
    const allLocationsP = OfficeBookingApi.getLocations();
    let locations;
    await Promise.all([allLocationsP]).then(messages => {
      console.log(messages);
      locations = messages[0];
    });
    console.log(locations);
    this.setState({ Locations: locations });
  }

  render() {
    const { classes } = this.props;
    // const allLocationsP = OfficeBookingApi.getLocations();
    // Promise.all([allLocationsP]).then(messages => {
    //   // console.log(messages);
    //   const locations = messages[0];
    // });
    console.log(this.state.Locations);
    return (
      <div>
        <Button style={{ width: "100%" }} onClick={this.getLocations}>
          {" "}
          Show Locations
        </Button>
        {this.state.Locations.map(function(location, i) {
          return (
            <div className={`${classes.eachOne}`}>
              <div className={`${classes.eachPart}`}>
                <h1 style={{ fontSize: "20px", position: "relative", top: "50%", color: "white" }}>{location}</h1>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const DisplayStyle = {
  eachOne: {
    width: "33%",
    display: "inline-block",
    marginLeft: "15%",
    textAlign: "center"
  },
  eachPart: {
    backgroundColor: "#002D7D",
    width: "200px",
    height: "200px"
  }
};
export default withStyles(DisplayStyle)(Display_Square);
