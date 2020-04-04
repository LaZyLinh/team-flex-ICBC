import React from 'react'

// router.post("/upload-floor-data", AdminFloorService.uploadFloorData);
// backend has this which takes a (spread sheet file) and puts the whole floor's data into the database
// https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/wikis/Floor-Data-Upload
// TODO: helper function in api/AdminApi for accessing this end point
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
    return (
      <React.Fragment>
        <div className={`${classes.headerStyle}`}>
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>Admin Page</h1>
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
  }
}

export default EditFloor;