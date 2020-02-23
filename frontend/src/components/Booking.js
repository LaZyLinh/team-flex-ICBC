import React from "react";
import { withStyles } from "@material-ui/core";
import { InputPicker } from "rsuite";
import OfficeBookingApi from "../api/OfficeBookingApi";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: [{ label: "DefaultLoc1" }] };
  }

  componentDidMount() {
    this.setState({
      selectedLocation: "",
      locations: [{ label: "Hello World" }, { label: "BBQ" }]
    });
  }

  onSelectLocation = event => {
    this.setState({ selectedLocation: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.container}`}>
        <div className={`${classes.leftPanel}`}>
          <InputPicker size="lg" className={`${classes.inputPicker}`} data={this.state.locations}></InputPicker>
        </div>
        <div className={`${classes.rightPanel}`}></div>
      </div>
    );
  }
}

const leftPercent = 30;
const leftPanelColor = "darkblue";
const rightPanelColor = "white";

const muiStyles = {
  inputPicker: {
    position: "absolute",
    height: "20vh",
    width: "80vw"
  },
  container: {
    position: "absolute",
    height: "100vh",
    width: "100vw"
  },
  leftPanel: {
    position: "absolute",
    height: "100vh",
    width: leftPercent + "vw",
    background: leftPanelColor
  },
  rightPanel: {
    position: "absolute",
    height: "100vh",
    left: leftPercent + "vw",
    width: 100 - leftPercent + "vw",
    background: rightPanelColor
  }
};

export default withStyles(muiStyles)(Booking);
