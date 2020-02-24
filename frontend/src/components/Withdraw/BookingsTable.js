import React from "react";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Delete Icon
import DeleteIcon from "@material-ui/icons/Delete";

class BookingsTable extends React.Component {
  onClickDelete = bookingId => () => {
    // TODO: confirmation
    // https://www.npmjs.com/package/react-confirm-alert

    // Call parent component's callback
    this.props.onCancelBooking(bookingId);
    console.log("DELETE " + bookingId);
  };

  render() {
    const classes = this.props.classes;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Office Location</TableCell>
              <TableCell align="right">Workspace ID</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Office Owner</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map(row => (
              <TableRow key={row.bookingId}>
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
  headerText: {
    color: "red"
  }
};

export default withStyles(muiStyles)(BookingsTable);
