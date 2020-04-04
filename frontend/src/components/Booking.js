import React from "react";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ArrowForwardOutlined, YoutubeSearchedFor } from "@material-ui/icons";
import { GiDesk } from "react-icons/gi";
import Button from "@material-ui/core/Button"; // only needs to be imported once
import EnhancedTable from "./Table.js";
import OfficeBookingApi from "../api/OfficeBookingApi";
import { createData } from "./Table";
import { DateRange } from "react-date-range";
import styles from "../styles/Booking.styles";
import logo from "../assets/home_logo.png";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      locations: [],
      floor: "",
      floors: [],
      startDate: new Date(),
      endDate: new Date(),
      features: [],
      packages: []
    };
  }

  componentDidMount = async () => {
    const reqs = [
      OfficeBookingApi.getLocations(),
      OfficeBookingApi.getFeatures()
      // OfficeBookingApi.getTopAvailabilities(20)
    ];
    const results = await Promise.all(reqs);
    console.log(results[1]);
    const features = results[1].map(f => {
      return {
        name: f,
        checked: false
      };
    });
    this.setState({
      locations: results[0],
      features
    });
    let floors = await OfficeBookingApi.getFloors({ location: "Vancouver" });
    const floorIds = floors.map(f => f.floorId);
    console.log(floorIds);
    const sdStr = this.state.startDate.toISOString().slice(0, 10);
    const edStr = this.state.endDate.toISOString().slice(0, 10);
    const res = await OfficeBookingApi.getPackages("2020-03-30", "2020-05-27");
    this.setState({ packages: res });
    console.log(res);
  };

  handleDateChange = dateRange => {
    this.setState({
      startDate: dateRange.selection.startDate,
      endDate: dateRange.selection.endDate
    });
    if (this.state.location) {
      // OfficeBookingApi.getPackages("2020-03-30", "2020-05-27", { floorIds });
    }
  };

  handleSelectLocation = event => {
    this.setState({ location: event.target.value });
    OfficeBookingApi.getFloors({ location: event.target.value }).then(floors => {
      const floorIds = floors.map(f => console.log(f));
      this.setState({ floors: floorIds });
    });
  };

  handleSelectFloor = event => {
    console.log(event);
  };

  handleCheckFeature = event => {
    console.log(event);
  };

  getLocationItems = () => {
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
  };

  getFloorItems = () => {
    let menuItems = [];
    let i = 0;
    for (const floor of this.state.floors) {
      menuItems.push(
        <MenuItem value={floor} key={i++}>
          {floor}
        </MenuItem>
      );
    }
    return menuItems;
  };

  render = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.header}>
          <Link href="/">
            <img className={classes.logo} src={logo} alt="Logo"></img>
          </Link>
          <div className={classes.title}>BOOKING</div>
          <GiDesk className={classes.icon} />
        </div>
        <div className={classes.leftPanel}>
          <DateRange
            scroll={{ enabled: true, monthHeight: 190 }}
            className={`${classes.calendar}`}
            direction="vertical"
            fixedHeight={false}
            editableDateInputs={false}
            onChange={this.handleDateChange}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            ranges={[
              {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                key: "selection",
                color: "#0048a8d9"
              }
            ]}
          />
          <FormControl variant="filled" className={classes.locationInput}>
            <InputLabel id="location">Location</InputLabel>
            <Select labelId="location" value={this.state.location} onChange={this.handleSelectLocation}>
              {this.getLocationItems()}
            </Select>
          </FormControl>
          <FormControl variant="filled" className={classes.floorInput}>
            <InputLabel id="floor">Floor</InputLabel>
            <Select labelId="floor" value={this.state.floor} onChange={this.handleSelectFloor}>
              {this.getFloorItems()}
            </Select>
          </FormControl>
          {/* <div className="featureSelection">
            {this.state.features.map((feature, i) => {
              console.log(feature);
              return (
                <Checkbox
                  label={feature.name}
                  value={feature.name}
                  onChange={this.handleCheckFeature}
                  checked={feature.checked}
                  key={i}
                />
              );
            })}
          </div> */}
          <div className={classes.pkgsContainer}>{this.renderPackages(classes)}</div>
        </div>
      </div>
    );
  };

  renderPackages = classes => {
    const pkgItems = [];
    let i = 1;
    for (const pkg of this.state.packages) {
      const availItems = [];
      let j = 1;
      for (const availability of pkg) {
        availItems.push(
          <ExpansionPanelDetails>
            <div>
              <Card className={classes.availabilityItem}>
                <CardContent>
                  <Typography variant="h5" component="h2" className={classes.availTitle} gutterBottom>
                    Availability {j}
                  </Typography>
                  <Typography>
                    <strong>Start:</strong> {availability.startDate}
                    <br />
                    <strong>End:</strong> {availability.endDate}
                  </Typography>
                  <Typography className={classes.pos}>
                    <strong>Workspace:</strong> ${availability.workspaceId}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    <strong>Owner comment:</strong> {availability.comment || "None"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Floor Plan</Button>
                </CardActions>
              </Card>
            </div>
          </ExpansionPanelDetails>
        );
        j++;
      }
      pkgItems.push(
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.packageHeading}>Package {i}</div>
          </ExpansionPanelSummary>
          {availItems}
        </ExpansionPanel>
      );
      i++;
    }
    return pkgItems;
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
