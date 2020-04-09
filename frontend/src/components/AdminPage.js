/* eslint-disable react/jsx-pascal-case */
import React from "react";
import Display_Square from "./display/Display_Square";
import logo from "../assets/house_flexwork_logo.png";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getLocationNames } from "../api/AdminApi";
import featureMap from "../api/FeatureMap";
import ManageLocations from "./admin/locations/ManageLocations";
import AddLocation from "./admin/AddLocation";
import AddFeature from "./admin/AddFeature";
import EditFeatures from "./admin/EditFeatures";

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      featureMap: {}
    };
  }

  getLocations = () => {
    return this.state.locations;
  };

  async componentDidMount() {
    await this.updateLocations();
    await this.updateFeatures();
  }

  updateLocations = async () => {
    this.setState({ locations: await getLocationNames() });
  };

  updateFeatures = async () => {
    this.setState({ featureMap: await featureMap() });
  };

  render() {
    return (
      <Grid container spacing={1} style={{ height: "100%", width: "100%" }} direction="column" alignItems="center">
        <Grid item style={{ height: "10px", width: "100%", backgroundColor: "#002D7D" }}></Grid>
        {/* Header bar */}
        <Grid
          item
          container
          xs={12}
          style={{ backgroundColor: "#002D7D", height: "110px" }}
          spacing={1}
          alignItems="center"
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={9}>
            <Typography variant="h3" style={{ color: "white" }}>
              Admin Page
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Link href="/">
              <img src={logo} style={{ height: "80px" }} alt="Logo"></img>
            </Link>
          </Grid>
        </Grid>

        {/* Spacing */}
        <Grid item style={{ height: "20px" }} />

        <Grid item>
          <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" fontFamily="fontFamily" letterSpacing={2}>
            Manage Locations
          </Box>
        </Grid>

        {/* Spacing */}
        <Grid item style={{ height: "20px" }} />

        {/* Add Location */}
        <Grid item style={{ width: "60%" }}>
          <ManageLocations />
        </Grid>

        {/* Spacing */}
        <Grid item style={{ height: "30px" }} />
        <hr style={{ height: "5px", width: "80%" }}></hr>
        <Grid item style={{ height: "20px" }} />

        {/* Edit Features */}
        <Grid item>
          <Box fontSize="h4.fontSize" fontWeight="fontWeightMedium" fontFamily="fontFamily" letterSpacing={2}>
            Add/Delete Features
          </Box>
        </Grid>
        <AddFeature
          style={{ height: "100%", width: "100%" }}
          featureMap={this.state.featureMap}
          updateFeaturesCallback={this.updateFeatures}
        />
        <Grid item style={{ height: "30px" }} />
        <EditFeatures
          style={{ height: "100%", width: "100%" }}
          featureMap={this.state.featureMap}
          updateFeaturesCallback={this.updateFeatures}
        />
      </Grid>
    );
  }
}

export default AdminPage;
