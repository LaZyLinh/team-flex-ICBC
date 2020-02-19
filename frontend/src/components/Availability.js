import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Availability extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField label="Office Owner's Staff Id" variant="filled" />
        <FormControl variant="filled">
          <InputLabel>Office Location</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel>Office Room Number</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox color="primary" />} label="Air Conditioning" />
        <FormControlLabel control={<Checkbox color="primary" />} label="Conference Room" />
        <FormControlLabel control={<Checkbox color="primary" />} label="TV" />
      </React.Fragment>
    );
  }
}

export default Availability;
