import React from "react";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InfiniteCalendar, { Calendar, withRange } from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once

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
          control={<Checkbox checked={false} onChange={this.onFeatureCheckbox(i)} value={feature} />}
          label={feature}
          key={i++}
        />
      );
    }
    return featureItems;
  }

  render() {
    const { classes } = this.props;
    const CalendarWithRange = withRange(Calendar);

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
          <InfiniteCalendar
            className={`${classes.infiniteCalendar}`}
            Component={CalendarWithRange}
            // for some reason making "width" a string makes it flexible
            width="flex"
            // but doesn't work for height, need to specify a pixel size
            height={300}
            minDate={new Date()}
            min={new Date()}
            selected={{
              start: new Date(),
              end: new Date()
            }}
            locale={{
              headerFormat: "MMM Do"
            }}
            theme={{
              headerColor: "darkblue",
              weekdayColor: "darkblue"
            }}
          />

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

// Change these to adjust the relative size of the left panel
const leftPercent = 25;
const leftMargin = 2;
const leftPanelColor = "darkblue";
const rightPanelColor = "white";

const muiStyles = {
  infiniteCalendar: {
    position: "absolute",
    top: "17vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`
  },
  featureLabel: {
    position: "relative",
    left: "0.7vw",
    borderRadius: "10px",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    marginTop: "1vh",
    marginBottom: "1vh",
    background: "white",
    color: "darkblue",
    fontSize: "30px"
  },
  featureSelection: {
    position: "absolute",
    top: "65vh",
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
