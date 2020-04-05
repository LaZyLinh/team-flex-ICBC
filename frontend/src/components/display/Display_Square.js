import React from "react";
import OfficeBookingApi from "../../api/OfficeBookingApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { getLocationNames } from "../../api/AdminApi";

const EDIT_FLOORS_PATH = "/admin/edit-floors/";

class Display_Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Locations: []
    };
  }

  async componentDidMount() {
    this.setState({ Locations: await getLocationNames() });
  }

  onClickLocation = location => () => {
    console.log("onClickLoation: " + location);
    window.location.href = EDIT_FLOORS_PATH + location;
  };

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
        {this.state.Locations.map((location, i) => {
          return (
            <div className={`${classes.eachOne}`} key={i} onClick={this.onClickLocation(location)}>
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
    width: "20%",
    display: "inline-block",
    marginLeft: "10%",
    textAlign: "center"
  },
  eachPart: {
    backgroundColor: "#002D7D",
    width: "200px",
    height: "200px"
  }
};
export default withStyles(DisplayStyle)(Display_Square);
