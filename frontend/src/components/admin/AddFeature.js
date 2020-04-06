import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createFeature } from "../../api/AdminApi";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

export default class AddFeature extends React.Component {
  constructor() {
    super();
    this.state = {
      featureName: "",
      openSnackbar: false,
      snackbarSeverity: "",
      snackbarMessage: ""
    };
  }

  handleOnClick = async () => {
    const featureMap = this.props.featureMap;
    const featureNameTrimmed = this.state.featureName.trim();
    if (featureNameTrimmed.length === 0) {
      // do nothing
      return;
    }
    const featuresLower = Object.keys(featureMap).map(fn => fn.toLowerCase());
    if (featuresLower.includes(featureNameTrimmed.toLowerCase())) {
      this.setState({
        openSnackbar: true,
        snackbarSeverity: "error",
        snackbarMessage: "This feature already exists."
      });
      return;
    }
    try {
      await createFeature(featureNameTrimmed);
      this.setState({
        openSnackbar: true,
        snackbarSeverity: "success",
        snackbarMessage: `New feature ${featureNameTrimmed} added!`
      });
      this.props.updateFeatures(); // Parent
    } catch (err) {
      console.log(err);
      this.setState({ showUnknownError: true });
    }
  };

  handleTextChange = e => {
    this.setState({
      featureName: e.target.value,
      openSnackbar: false,
      snackbarSeverity: "",
      snackbarMessage: ""
    });
  };

  onCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
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
            <TextField id="newFeatureName" onChange={this.handleTextChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "purple", color: "white" }}
              onClick={this.handleOnClick}
            >
              + Feature
            </Button>
          </Grid>
        </Grid>
        <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.onCloseSnackbar}>
          <Alert onClose={this.onCloseSnackbar} severity={this.state.snackbarSeverity}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    );
  }
}
