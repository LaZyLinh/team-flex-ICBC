import React from "react";
import { withStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import InfiniteCalendar, { Calendar, withRange } from "react-infinite-calendar";
import HomeIcon from "@material-ui/icons/Home";
import { ArrowForwardOutlined } from "@material-ui/icons";
import OfficeLendingApi from "../api/OfficeLendingApi";

class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      locations: [],
      selectedRoom: "",
      rooms: [],
      features: [],
      startDate: new Date(),
      endDate: new Date(),
      staffId: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const proms = [OfficeLendingApi.getLocations(), OfficeLendingApi.getFeatures()];
    const results = await Promise.all(proms);
    this.setState({
      selectedLocation: "",
      locations: results[0],
      features: results[1].map(featureName => {
        return { name: featureName, checked: false };
      })
    });
    console.log("WASSSUP!");
    console.log(this.state.locations);
    console.log(this.state.features);
  }

  roomSelectMenuItems() {
    let menuItems = [];
    let i = 0;
    for (const room of this.state.rooms) {
      menuItems.push(
        <MenuItem value={room} key={i++}>
          {room}
        </MenuItem>
      );
    }
    return menuItems;
  }

  locationSelectMenuItems(locations) {
    let menuItems = [];
    let i = 0;
    for (const location of locations) {
      menuItems.push(
        <MenuItem value={location} key={i++}>
          {location}
        </MenuItem>
      );
    }
    return menuItems;
  }

  featureSelectionItems() {
    let featureItems = [];
    let i = 0;
    for (const feature of this.state.features) {
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

  handleInputChange(event) {
    console.log("value:" + event.target.value + " checked: " + event.target.checked);

    this.setState({
      features: this.state.features.map(f => {
        if (f.name === event.target.value) {
          return { name: f.name, checked: !f.checked };
        } else {
          return f;
        }
      })
    });
  }

  locationSelectMenuItems = () => {
    let menuItems = [];
    for (const location of this.state.locations) {
      menuItems.push(
        <MenuItem value={location} key={location}>
          {location}
        </MenuItem>
      );
    }
    return menuItems;
  };

  onClickConfirmAvailability = async () => {
    // const features = this.state.features;
    // const location = this.state.selectedLocation;
    const workspaceId = this.state.workspaceId;
    const sd = this.state.startDate;
    const ed = this.state.endDate;
    const sdStr = sd.toISOString().slice(0, 10);
    const edStr = ed.toISOString().slice(0, 10);
    try {
      await OfficeLendingApi.createAvailability(sdStr, edStr, workspaceId);
      console.log("createAvailability: 200 OK!");
    } catch (err) {
      console.log("createAvalability: " + err);
    }
  };

  render = () => {
    const { classes } = this.props;
    const CalendarWithRange = withRange(Calendar);

    return (
      <div className={`${classes.bg}`}>
        <div className={`${classes.topBg}`}>
          <Link href="/">
            <HomeIcon className={`${classes.home}`}></HomeIcon>
          </Link>
          <div
            style={{
              position: "absolute",
              top: "1.2vh",
              left: "6vw",
              fontFamily: "calibri",
              fontSize: "3vw",
              color: "#80ADED"
            }}
          >
            ICBC FLEX WORK
          </div>
          <div
            style={{
              position: "absolute",
              top: "1.2vh",
              left: "29vw",
              fontFamily: "calibri",
              fontSize: "3vw",
              fontWeight: "bold",
              color: "#002D7D"
            }}
          >
            LEND OFFICE
          </div>
        </div>
        <InfiniteCalendar
          className={`${classes.infiniteCalendar}`}
          Component={CalendarWithRange}
          // for some reason making "width" a string makes it flexible
          width="flex"
          // but doesn't work for height, need to specify a pixel size
          height={400}
          minDate={new Date()}
          min={new Date()}
          selected={{
            start: this.state.startDate,
            end: this.state.endDate
          }}
          locale={{
            headerFormat: "MMM Do"
          }}
          theme={{
            headerColor: "rgba(0,18,49,0.5)",
            weekdayColor: "rgba(0,18,49,0.5)"
          }}
          onSelect={this.onSelectCalendar}
        />
        <div className={classes.box}>
          <TextField
            label="Your Staff ID"
            variant="outlined"
            className={`${classes.field} ${classes.field1}`}
            value={this.state.staffId}
          />
          <FormControl variant="outlined" className={`${classes.field} ${classes.field2}`}>
            <InputLabel>Office Location</InputLabel>
            <Select>{this.locationSelectMenuItems(this.state.locations)}</Select>
          </FormControl>
          <TextField label="Workspace" variant="outlined" className={`${classes.field} ${classes.field3}`} />
          <FormControl variant="outlined" className={`${classes.field} ${classes.field3}`}>
            <InputLabel>Office Room Number</InputLabel>
            <Select>{this.roomSelectMenuItems()}</Select>
          </FormControl>
          <FormControl component="fieldset" className={`${classes.featureSelection}`}>
            <FormGroup>{this.featureSelectionItems()}</FormGroup>
          </FormControl>
        </div>
        <div className={`${classes.btmBg}`}>
          <Button
            onClick={this.onClickConfirmAvailability}
            className={`${classes.label} ${classes.btn} ${classes.btn1}`}
            variant="contained"
            href="/finished"
          >
            Confirm Availability
          </Button>
          <ArrowForwardOutlined className={`${classes.arrow}`}></ArrowForwardOutlined>
        </div>
      </div>
    );
  };
}

const boxTop = "15.33%";

const muiStyles = {
  bg: {
    position: "absolute",
    backgroundImage: `url(${require("../assets/blank.jpg")})`,
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0"
  },
  infiniteCalendar: {
    position: "absolute",
    top: boxTop,
    left: "4.79%",
    width: "35%",
    borderRadius: "15px"
  },
  box: {
    position: "absolute",
    left: "44.03%",
    right: "6.6%",
    top: boxTop,
    bottom: "17.4%",
    background: "rgba(0,18,49,0.5)",
    mixBlendMode: "normal",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "15px"
  },
  topBg: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "91%",
    background: "rgba(235,242,255,0.7)"
  },
  btmBg: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "91%",
    bottom: "0%",
    background: "rgba(235,242,255,0.7)"
  },
  field: {
    position: "absolute",
    left: "5%",
    right: "5%",
    background: "#F4F7FC",
    borderRadius: "5px"
  },
  field1: {
    top: "10%"
  },
  field2: {
    top: "25%"
  },
  field3: {
    top: "40%"
  },
  btn: {
    background: "#0048A8",
    borderRadius: "20px",
    textAlign: "center"
  },
  label: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "45px",
    display: "flex",
    alignItems: "left",
    textAlign: "center",
    color: "#FFFFFF"
  },
  arrow: {
    position: "absolute",
    right: "2.96%",
    top: "25%",
    height: "50%",
    color: "#FFFFFF"
  },
  home: {
    position: "absolute",
    left: "1.6%",
    right: "95.56%",
    top: "25%",
    height: "50%",
    color: "#0276BA",
    fontSize: "3em"
  },
  btn1: {
    position: "absolute",
    left: "73.47%",
    right: "1.50%",
    top: "10%",
    bottom: "10%"
  },
  featureSelection: {
    position: "absolute",
    top: "55%",
    left: "5%",
    right: "50%"
  },
  featureLabel: {
    position: "relative",
    left: "0.7vw",
    borderRadius: "10px",
    paddingTop: "1vh",
    paddingBottom: "0.5vh",
    marginTop: "1vh",
    marginBottom: "0.5vh",
    background: "#F4F7FC",
    color: "#002D7D",
    fontSize: "25px",
    height: "5vh"
  }
};

export default withStyles(muiStyles)(Availability);
