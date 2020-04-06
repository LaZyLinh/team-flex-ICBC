import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { deleteFeature } from "../../api/AdminApi";

class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedDelete: false
    };
  }

  onClickDelete = () => {
    this.setState({ clickedDelete: true });
  };

  onClickConfirmDelete = async () => {
    await deleteFeature(this.props.featureId);
    this.props.updateFeaturesCallback();
  };

  showDeleteButton = () => {
    if (this.state.clickedDelete) {
      return (
        <Button
          variant="contained"
          style={{ width: "200px" }}
          color="secondary"
          size="small"
          onClick={this.onClickConfirmDelete}
        >
          Confirm Delete
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{ width: "200px" }}
          color="secondary"
          size="small"
          onClick={this.onClickDelete}
        >
          Delete Permanently
        </Button>
      );
    }
  };

  render() {
    return (
      <Grid item container xs={12} sm={6} md={4} lg={3} direction="column" justify="center" alignItems="center">
        <Grid
          item
          style={{
            textAlign: "center",
            verticalAlign: "center",
            fontSize: "20px",
            backgroundColor: "gray",
            width: "200px",
            height: "80px",
            color: "white",
            padding: "10px"
          }}
        >
          <Box fontSize="20px" fontWeight="fontWeightMedium" fontFamily="fontFamily" letterSpacing={1}>
            {this.props.featureName}
          </Box>
        </Grid>
        <div />
        {this.showDeleteButton()}
        <div style={{ height: "20px" }} />
      </Grid>
    );
  }
}

const EditFeatures = ({ featureMap, updateFeaturesCallback }) => {
  return (
    <Grid container direction="row" alignItems="center" justify="center">
      {Object.keys(featureMap).map((featureName, i) => (
        <Feature
          featureName={featureName}
          featureId={featureMap[featureName]}
          key={i}
          updateFeaturesCallback={updateFeaturesCallback}
        />
      ))}
    </Grid>
  );
};

export default EditFeatures;
