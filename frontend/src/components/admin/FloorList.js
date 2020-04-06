import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

class FloorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { floors: this.props.floors };
  }

  handleClickLine = index => {
    this.props.callback(index);
  };

  handleEdit = index => {
    this.props.editFloorCallback(index);
  };

  handleDelete = index => {
    this.props.deleteCallback(index);
  };

  render() {
    const { classes } = this.props;

    return (
      <Table style={{ backgroundColor: "#7D90B2", width: "98%", border: "none", cellspacing: "0", cellpadding: "0" }}>
        {this.state.floors[0] ? (
          <TableRow
            key="floor_title"
            style={{ backgroundColor: "white", width: "100%", height: "56px", fontWeight: "bold" }}
          >
            <TableCell style={{ width: "20px", fontWeight: "bold" }}>Floor Number</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Location</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>City</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Building</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ) : (
            <span className={`${classes.noSpan}`}>No floor found</span>
          )}
        {this.state.floors.map((item, index) => (
          <TableRow key={index} onClick={() => this.handleClickLine(index)} className={`${classes.row}`}>
            <TableCell style={{ border: "none" }}>{item.FloorNo}</TableCell>
            <TableCell>{item.Location}</TableCell>
            <TableCell>{item.City}</TableCell>
            <TableCell>{item.Building}</TableCell>
            <TableCell>
              <Tooltip title="Edit Workspaces" placement="top">
                <EditIcon className={`${classes.editbtn}`} onClick={() => this.handleEdit(index)} />
              </Tooltip>
              <Tooltip title="Delete Floor" placement="top">
                <DeleteIcon
                  className={`${classes.deleteIcon}`}
                  onClick={() => {
                    this.handleDelete(index);
                  }}
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}

const muiStyles = {
  noSpan: {
    height: "56px",
    textAlign: "center",
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
      backgroundColor: "#DAE1EC"
    }
  }
};

export default withStyles(muiStyles)(FloorList);
