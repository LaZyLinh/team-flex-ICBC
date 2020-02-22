import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField id="standard-basic" label="Password" />
        <Button variant="contained">Login</Button>
      </React.Fragment>
    );
  }
}

export default Admin;
