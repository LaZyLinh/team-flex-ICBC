import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ArrowForwardOutlined, YoutubeSearchedFor } from "@material-ui/icons";
import { GiCalendar } from "react-icons/gi";
import Button from "@material-ui/core/Button"; // only needs to be imported once
import EnhancedTable from "./Table.js";
import OfficeBookingApi from "../api/OfficeBookingApi";
import { createData } from "./Table";
import styles from "./../styles/Booking.styles";
import logo from "../assets/home_logo.png";
import { DateRange } from "react-date-range";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.header}>
          <Link href="/">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
          <div className={classes.title}>Booking</div>
          <GiCalendar className={classes.icon} />
        </div>
      </div>
    );
  };
}

class Booking2 extends React.Component {
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

          <DateRange
            scroll={{ enabled: true, monthHeight: 300 }}
            className={`${classes.calendar}`}
            direction="vertical"
            fixedHeight={false}
            editableDateInputs={false}
            onChange={this.handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={[this.state]}
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

export default withStyles(styles)(Booking);
