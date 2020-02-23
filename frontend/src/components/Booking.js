import React from "react";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { DateRangePicker } from "rsuite";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ConfirmBooking from "./ConfirmBooking";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      locations: [],
      features: [],
      availabilities: []
    };
  }

  componentDidMount() {
    // Replace with API call to /locations and (to be added to API) /features
    this.setState({
      selectedLocation: "",
      locations: ["Hello World", "BBQ"],
      features: ["TV", "Private", "Conference Phone"],
      availabilities: []
    });
  }

  availabilityItems() {
    let availabilities = [];

    return availabilities;
  }

  onSelectLocation = event => {
    this.setState({ selectedLocation: event.target.value });
  };

  locationSelectMenuItems() {
    let menuItems = [];
    let i = 0;
    for (const location of this.state.locations) {
      menuItems.push(
        <MenuItem value={location} key={i++}>
          {location}
        </MenuItem>
      );
    }
    return menuItems;
  }

  onFeatureCheckbox = index => event => {
    // TODO
  };

  featureSelectionItems() {
    let featureItems = [];
    let i = 0;
    for (const feature of this.state.features) {
      featureItems.push(
        <FormControlLabel
          className={`${this.props.classes.featureLabel}`}
          control={<Checkbox checked={feature} onChange={this.onFeatureCheckbox(i)} value={feature} />}
          label={feature}
        />
      );
    }
    return featureItems;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.container}`}>
        <div className={`${classes.leftPanel}`}>
          <div className={`${classes.locationPickerBg}`}></div>
          {/* Location Selection */}
          <FormControl color="secondary" className={`${classes.locationSelect}`}>
            <InputLabel style={{ fontSize: "27px", color: "darkblue" }}>Office location</InputLabel>
            <Select
              className={`${classes.locationSelectDropdown}`}
              value={this.selectedLocation}
              onChange={this.onSelectLocation}
            >
              {this.locationSelectMenuItems()}
            </Select>
          </FormControl>

          {/* Calendar Picker */}
          <DateRangePicker
            size="lg"
            className={`${classes.dateRangePicker}`}
            placeholder="Select date range"
          ></DateRangePicker>

          {/*Feature Selection*/}
          <FormControl component="fieldset" className={classes.featureSelection}>
            <FormGroup>{this.featureSelectionItems()}</FormGroup>
          </FormControl>
        </div>
        <div className={`${classes.rightPanel}`}>{/* TODO */}</div>
      </div>
    );
  }
}

const leftPercent = 30;
const leftMargin = 2;
const leftPanelColor = "darkblue";
const rightPanelColor = "white";

const muiStyles = {
  featureLabel: {
    position: "relative",
    left: "0.7vw",
    borderRadius: "10px",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    marginTop: "2vh",
    marginBottom: "2vh",
    background: "white",
    color: "darkblue",
    fontSize: "30px"
  },
  featureSelection: {
    position: "absolute",
    top: "40vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`
  },
  dateRangePicker: {
    position: "absolute",
    top: "20vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`
  },
  locationPickerBg: {
    position: "absolute",
    height: "10.8vh",
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`,
    top: "5.5vh",
    left: `${leftMargin - 0.7}vw`,
    backgroundColor: "white",
    borderRadius: "10px"
  },
  locationSelectDropdown: {
    fontSize: "35px",
    color: "darkblue"
  },
  locationSelect: {
    position: "absolute",
    height: "10vh",
    width: `${leftPercent - leftMargin * 2}vw`,
    top: "6vh",
    left: `${leftMargin}vw`
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
