import React from 'react'
import { TextField, withStyles } from "@material-ui/core";

// router.post("/upload-floor-data", AdminFloorService.uploadFloorData);
// backend has this which takes a (spread sheet file) and puts the whole floor's data into the database
// https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/wikis/Floor-Data-Upload
// helper function in api/AdminApi for accessing this end point
// Choice 1 - integrate this UI into this page
// Choice 2 - have a button that leads to a page that handles it

class EditFloor extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      windowOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Edit Floor</h1>
        </div>
        <div className={`${classes.split, classes.left}`}>
          <h2>Jane Flex</h2>
        </div>
        <div className={`${classes.split, classes.right}`}>
          <h2>Jane Flex</h2>
        </div>
      </React.Fragment>
    )
  }
}

const muiStyles = {
  headerStyle: {
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "0px",
    height: "100px",
    backgroundColor: "#002D7D"
  },

  split: {
    height: "100%",
    width: "50%",
    position: "fixed",
    zIndex: '1',
    top: 0,
    overflowX: "hidden",
    paddingTop: "20px"
  },

  left: {
    left: 0,
    backgroundColor: "#111"
  },

  right: {
    right: 0,
    backgroundColor: "red"
  }

}

export default withStyles(muiStyles)(EditFloor);