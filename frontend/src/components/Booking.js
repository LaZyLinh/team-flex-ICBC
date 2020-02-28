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
import "react-infinite-calendar/styles.css";
import { ArrowForwardOutlined, YoutubeSearchedFor } from "@material-ui/icons";
import Button from "@material-ui/core/Button"; // only needs to be imported once
import EnhancedTable from "./Table.js";
import OfficeBookingApi from "../api/OfficeBookingApi";
import { createData } from "./Table";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      locations: [],
      checkingFeatures: [],
      availabilities: [],
      hasAvail: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const proms = [
      OfficeBookingApi.getLocations(),
      OfficeBookingApi.getFeatures(),
      OfficeBookingApi.getTopAvailabilities(20)
    ];
    const results = await Promise.all(proms);
    const rows = [];
    for (const avail of results[2]) {
      rows.push(createData(avail.workspaceName, "TV", avail.startDate.toString(), avail.endDate.toString()));
    }
    this.setState({
      selectedLocation: "",
      locations: results[0],
      checkingFeatures: results[1].map(featureName => {
        return { name: featureName, checked: false };
      }),
      availabilities: rows,
      hasAvail: true
    });

    // Fake features:

    // set whether page should dipslay table or no avail
    // if (this.state.availabilities.length !== 0) {
    //   this.setState({ hasAvail: true });
    // }
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

  handleInputChange(event) {
    this.setState({
      checkingFeatures: this.state.checkingFeatures.map(cf => {
        if (cf.name === event.target.value) {
          return { name: cf.name, checked: !cf.checked };
        } else {
          return cf;
        }
      })
    });
  }

  featureSelectionItems() {
    let featureItems = [];
    let i = 0;
    for (const feature of this.state.checkingFeatures) {
      featureItems.push(
        <FormControlLabel
          className={`${this.props.classes.featureLabel}`}
          control={
            <Checkbox
              checked={feature.checked}
              onChange={this.handleInputChange}
              value={feature.name}
              style={{
                color: "#002D7D"
              }}
            />
          }
          label={feature.name}
          key={i++}
        />
      );
    }
    return featureItems;
  }

  // Populating the right panel based on this.state.hasAvail
  rightPanel(classes) {
    if (this.state.hasAvail) {
      return <EnhancedTable rows={this.state.availabilities} />;
    } else {
      return (
        <React.Fragment>
          <YoutubeSearchedFor className={`${classes.searchIcon}`}></YoutubeSearchedFor>
          <div className={`${classes.noAvailText}`}> No office available. Try again later!</div>
        </React.Fragment>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const CalendarWithRange = withRange(Calendar);

    return (
      <div className={`${classes.container}`}>
        <div className={`${classes.rightPanel}`}> {this.rightPanel(classes)}</div>
        {/* Reason for putting bottom bar here: so the left panel goes on top */}
        <div className={`${classes.bottomBar}`}>
          <Button className={`${classes.bottomBtn}`} variant="contained" href="/confirm">
            Next
          </Button>
          <ArrowForwardOutlined className={`${classes.arrow1}`}></ArrowForwardOutlined>
        </div>
        <div className={`${classes.leftPanel}`}>
          <div className={`${classes.locationPickerBg}`}></div>
          {/* Location Selection */}
          <FormControl color="primary" className={`${classes.locationSelect}`}>
            <InputLabel style={{ fontSize: "20px", color: "darkblue" }}>Office location</InputLabel>
            <Select
              className={`${classes.locationSelectDropdown}`}
              id="standard-basic"
              variant="standard"
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
              headerFormat: "MMM D"
            }}
            theme={{
              headerColor: "#002D7D",
              weekdayColor: "#002D7D"
            }}
          />

          {/*Feature Selection*/}
          <FormControl component="fieldset" className={classes.featureSelection}>
            <FormGroup>{this.featureSelectionItems()}</FormGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

// Change these to adjust the relative size of the left panel
const leftPercent = 25;
const leftMargin = 2;
const leftPanelColor = "#002D7D";
const rightPanelColor = "white";

const muiStyles = {
  infiniteCalendar: {
    position: "absolute",
    top: "11vh",
    left: `${leftMargin - 1.8}vw`,
    width: `${leftPercent - leftMargin * 2 + 3.6}vw`
  },
  featureLabel: {
    position: "relative",
    left: "0.7vw",
    borderRadius: "10px",
    paddingTop: "1vh",
    paddingBottom: "0.5vh",
    marginTop: "1vh",
    marginBottom: "0.5vh",
    background: "white",
    color: "#002D7D",
    fontSize: "25px",
    height: "5vh"
  },
  featureSelection: {
    position: "absolute",
    top: "64vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.8}vw`
  },
  dateRangePicker: {
    position: "absolute",
    top: "15vh",
    left: `${leftMargin - 0.7}vw`,
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`
  },
  locationPickerBg: {
    position: "absolute",
    height: "9vh",
    width: `${leftPercent - leftMargin * 2 + 1.4}vw`,
    top: "2vh",
    left: `${leftMargin - 0.7}vw`,
    backgroundColor: "white",
    borderRadius: "10px"
  },
  locationSelectDropdown: {
    fontSize: "25px",
    color: "#002D7D"
  },
  locationSelect: {
    position: "absolute",
    height: "5vh",
    width: `${leftPercent - leftMargin * 2}vw`,
    top: "2vh",
    left: `${leftMargin}vw`
  },
  container: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    left: "0",
    top: "0"
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
  },
  bottomBar: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "94%",
    bottom: "0%",
    background: "#EBF2FF"
  },
  bottomBtn: {
    position: "absolute",
    left: "85.14%",
    right: "3.19%",
    top: "9.84%",
    bottom: "11.73%",
    background: "#0048A8",
    borderRadius: "20px",
    fontFamily: "Inter",
    fontASyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#FFFFFF"
  },
  arrow1: {
    position: "absolute",
    left: "94.19%",
    right: "2.96%",
    top: "22%",
    color: "#FFFFFF"
  },
  searchIcon: {
    position: "absolute",
    left: "31%",
    top: "40%",
    height: "15%",
    color: "#817B7B"
  },
  noAvailText: {
    position: "absolute",
    left: "35%",
    top: "45%",
    fontFamily: "Inter",
    fontASyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "36px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#817B7B"
  },
  tableHeader: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "95%",
    background: "#F1F4F8"
  }
};

export default withStyles(muiStyles)(Booking);
