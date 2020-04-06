import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createLocation } from "../../api/AdminApi";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

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
    const lowercaseLocations = locations.map(l => l.toLowerCase());
    if (lowercaseLocations.includes(locationTrimmed.toLowerCase())) {
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
      showSuccess: false,
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
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="nowrap"
      >
        <Grid item xs={7}></Grid>
        <Grid item container xs={5} direction="row" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField id="newLocationName" onChange={this.handleTextChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={this.handleOnClick}>
              + Location
            </Button>
          </Grid>
        </Grid>
        {this.showAlertIfNeeded()}
      </Grid>
    );
  }
}
