import React from "react";
import { withStyles } from "@material-ui/core";
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
import { ArrowForwardOutlined } from "@material-ui/icons";

class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "",
      locations: [],
      checkingFeatures: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedLocation: "",
      locations: ["Hello World", "BBQ"],
      checkingFeatures: [
        { name: "TV", checked: false },
        { name: "Private", checked: false },
        { name: "Conference Phone", checked: false }
      ]
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

  handleInputChange(event) {
    console.log("value:" + event.target.value + " checked: " + event.target.checked);

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

  render() {
    const { classes } = this.props;
    const CalendarWithRange = withRange(Calendar);

    return (
      <React.Fragment>
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
        <div className={classes.box}>
          <TextField
            label="Office Owner's Staff Id"
            variant="outlined"
            className={`${classes.field} ${classes.field1}`}
          />
          <FormControl variant="outlined" className={`${classes.field} ${classes.field2}`}>
            <InputLabel>Office Location</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={`${classes.field} ${classes.field3}`}>
            <InputLabel>Office Room Number</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset" className={`${classes.featureSelection}`}>
            <FormGroup>{this.featureSelectionItems()}</FormGroup>
          </FormControl>
        </div>
        <div className={`${classes.btmBg}`}>
          <Button className={`${classes.label} ${classes.btn} ${classes.btn1}`} variant="contained" href="/finished">
            Confirm Availability
          </Button>
          <ArrowForwardOutlined className={`${classes.arrow}`}></ArrowForwardOutlined>
        </div>
      </React.Fragment>
    );
  }
}

const boxTop = "15.33%";
const leftMargin = 2;

const muiStyles = {
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
    background: "#002D7D",
    mixBlendMode: "normal",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "15px"
  },
  btmBg: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "91%",
    bottom: "0%",
    background: "#EBF2FF"
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
