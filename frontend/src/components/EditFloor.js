import React from 'react'

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