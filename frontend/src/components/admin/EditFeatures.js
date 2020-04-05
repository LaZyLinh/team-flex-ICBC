import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const EditFeatures = () => {
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      alignContent="stretch"
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h3" color="initial">
          Modify Features
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EditFeatures;
