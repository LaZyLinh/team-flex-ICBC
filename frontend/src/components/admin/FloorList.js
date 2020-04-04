import React from 'react'
import { TextField, withStyles } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class FloorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { floors: this.props.floors }
  }

  handleClickLine = (index) => {
    this.props.callback(index)
  }

  handleEdit = (index) => {
    // TODO go to edit workspace page
  }

  handleDelete = (index) => {
    this.props.deleteCallback(index)
  }



  render() {
    const { classes } = this.props;

    return (
      < table style={{ backgroundColor: "#7D90B2", width: "100%", border: "none", cellspacing: "0", cellpadding: "0" }} >
        {this.state.floors[0] ? <tr key="floor_title" style={{ backgroundColor: "white", width: "100%", height: "56px" }}>
          <th style={{ width: "20px" }}>Floor Number</th>
          <th>Location</th>
          <th>City</th>
          <th>Building</th>
          <th></th>
        </tr> : <span className={`${classes.noSpan}`}>No floor found</span>}
        {
          this.state.floors.map((item, index) =>
            <tr key={index} onClick={() => this.handleClickLine(index)} className={`${classes.row}`}>
              <th style={{ border: "none" }}>{item.FloorNo}</th>
              <th>{item.Location}</th>
              <th>{item.City}</th>
              <th>{item.Building}</th>
              <th>
                <EditIcon className={`${classes.editbtn}`} onClick={() => this.handleEdit(index)} />
                <DeleteIcon className={`${classes.deleteIcon}`} onClick={() => { this.handleDelete(index) }} />
              </th>
            </tr>)
        }
      </ table >
    )
  }

}

const muiStyles = {
  noSpan: {
    height: "56px", textAlign: "center",
    paddingLeft: "40%",
    paddingTop: "20px",
    paddingBotton: "20px"
  },
  editbtn: {
    "&:hover": {
      cursor: "pointer"
    }
  },

  deleteIcon: {
    marginLeft: "10px",
    "&:hover": {
      cursor: "pointer"
    }
  },

  row: {
    backgroundColor: "white",
    width: "100%",
    height: "46px",
    border: "none",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)",
      backgroundColor: "#DAE1EC",
    }
  }
}


export default withStyles(muiStyles)(FloorList);