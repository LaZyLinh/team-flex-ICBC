import React from "react";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { confirmAlert } from "react-confirm-alert";
// Delete Icon
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import TaleSortLabel from "@material-ui/core/TableSortLabel";

class BookingsTable extends React.Component {
  onClickDelete = bookingId => () => {
    const options = {
      title: "Confirm deletion",
      message: "Are you sure to delete this booking",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.onCancelBooking(bookingId);
          }
        },
        {
          label: "No",
          onClick: () => {
            window.history.back();
          }
        }
      ]
    };
    // https://www.npmjs.com/package/react-confirm-alert
    confirmAlert(options);
    // Call parent component's callback
    console.log("DELETE " + bookingId);
  };

  render() {
    const classes = this.props.classes;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.headerRow}>Office Location</TableCell>
              <TableCell align="right">Workspace ID</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Office Owner</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Cancel</TableCell>
              {/*<confirmA />*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map(row => (
              <TableRow key={row.bookingId}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.city}
                </TableCell>
                <TableCell align="right">{row.workspaceId}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">{row.officeOwner}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={this.onClickDelete(row.bookingId)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const muiStyles = {
  headerRow: {
    color: "red",
    backgroundColor: "black"
  }
};

export default withStyles(muiStyles)(BookingsTable);
