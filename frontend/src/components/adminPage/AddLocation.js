import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createLocation, getLocationNames } from "../../api/AdminApi";
import Alert from "@material-ui/lab/Alert";

export default class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    const locations = props.locations;
    this.state = {
      showCityAlreadyAddedError: false,
      showSuccess: false,
      showUnknownError: false,
      locations,
      location: ""
    };
  }

  async componentDidMount() {
    this.setState({ locations: await getLocationNames() });
  }

  handleOnClick = async () => {
    const locationTrimmed = this.state.location.trim();
    if (locationTrimmed.length === 0) {
      // do nothing
      return;
    }
    if (this.state.locations.includes(locationTrimmed)) {
      console.log("locations includes the entered location!");
      this.setState({
        showCityAlreadyAddedError: true
      });
      return;
    }
    console.log("AddLocation handleOnClick happy path begins");
    try {
      await createLocation(locationTrimmed);
      this.setState({ showGreen: true });
    } catch (err) {
      console.log(err);
      this.setState({ showUnknownError: true });
    }
  };

  handleTextChange = e => {
    this.setState({
      location: e.target.value,
      showCityAlreadyAddedError: false,
      showGreen: false,
      showUnknownError: false
    });
  };

  showAlertIfNeeded = () => {
    if (this.state.showCityAlreadyAddedError) {
      return (
        <Alert style={{ position: "absolute", top: "40px", left: "55%" }} severity="error">
          "{this.state.location}" has already been added.
        </Alert>
      );
    } else if (this.state.showSuccess) {
      return (
        <Alert style={{ position: "absolute", top: "40px", left: "55%" }} severity="success">
          New city "{this.state.location}" successfully added! You rock!
        </Alert>
      );
    } else if (this.state.showUnknownError) {
      return (
        <Alert style={{ position: "absolute", top: "40px", left: "55%" }} severity="error">
          An error has occurred when trying to add "{this.state.location}"
        </Alert>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <TextField
          id="newLocationName"
          onChange={this.handleTextChange}
          style={{ position: "absolute", top: "120px", left: "50%", width: "19.5%" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ position: "absolute", top: "120px", left: "70%", width: "10%" }}
          onClick={this.handleOnClick}
        >
          + Location
        </Button>
        {this.showAlertIfNeeded()}
      </React.Fragment>
    );
  }
}
