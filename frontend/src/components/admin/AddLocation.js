import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createLocation } from "../../api/AdminApi";
import Alert from "@material-ui/lab/Alert";

export default class AddLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      showCityAlreadyAddedError: false,
      showSuccess: false,
      showUnknownError: false,
      location: ""
    };
  }

  // async componentDidMount() {
  //   this.setState({ locations: await getLocationNames() });
  // }

  handleOnClick = async () => {
    const locations = this.props.getLocations();
    const locationTrimmed = this.state.location.trim();
    if (locationTrimmed.length === 0) {
      // do nothing
      return;
    }
    if (locations.includes(locationTrimmed)) {
      this.setState({
        showCityAlreadyAddedError: true
      });
      return;
    }
    try {
      await createLocation(locationTrimmed);
      this.setState({ showSuccess: true });
      this.props.updateLocations(); // Parent
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
          New city "{this.state.location}" successfully added.
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
