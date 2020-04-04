import React from 'react'
import { TextField, withStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class FloorList extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(this.props.floors))
    this.state = { floors: this.props.floors }
  }

  handleClickLine = (index) => {
    this.props.callback(index)
  }

  render() {
    const { classes } = this.props;

    return (
      < table style={{ backgroundColor: "#7D90B2", width: "100%", border: "none", cellspacing: "0", cellpadding: "0" }} >
        <tr key="floor_title" style={{ backgroundColor: "white", width: "100%", height: "56px" }}>
          <th style={{ width: "20px" }}>Floor Number</th>
          <th>Location</th>
          <th>City</th>
          <th>Building</th>
        </tr>
        {
          this.state.floors.map((item, index) =>
            <tr key={index} onClick={() => this.handleClickLine(index)} className={`${classes.row}`}>
              <th style={{ border: "none" }}>{item.FloorNo}</th>
              <th>{item.Location}</th>
              <th>{item.City}</th>
              <th>{item.Building}</th>
              <EditIcon />
              <DeleteIcon className={`${classes.deleteIcon}`} /> </tr>)
        }
      </ table >
    )
  }

}

const muiStyles = {
  deleteIcon: {
    right: 0
  },

  row: {
    backgroundColor: "white",
    width: "100%",
    height: "56px",
    border: "none",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)"
    }
  }
}


export default withStyles(muiStyles)(FloorList);