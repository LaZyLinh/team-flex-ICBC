
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export default class AddLocation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField id="newLocationName" style={{ position: "absolute", top: "12%", left: "50%", width: "20%" }} />
        <Button style={{ position: "absolute", top: "10%", left: "70%", width: "10%" }}>+ Location</Button>
      </React.Fragment>
    );
  }
}
