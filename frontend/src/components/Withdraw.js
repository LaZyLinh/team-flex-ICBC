import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";
import BookingsTable from "./Withdraw/BookingsTable";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.api = new OfficeBookingApi();
    this.state = {
      staffId: -1,
      // bookings: [],
      // TEST:
      bookings: [
        {
          bookingId: 8,
          startDate: "2020-04-22",
          endDate: "2020-04-30",
          workspace: {
            workspaceId: "NV4-03A",
            floor: {
              city: "North Vancouver"
            },
            staff: {
              firstName: "Kobe",
              lastName: "Bryant"
            }
          }
        }
      ],
      error: null,
      showBookingCancelSuccess: false
    };
    this.onCancelBooking = this.onCancelBooking.bind(this);
  }

  onSubmitStaffId(staffId) {
    this.api.getBookingsByUserID(this.state.staffId, (error, data) => {
      if (error) {
        this.setState({
          staffId: staffId,
          error: error,
          bookings: []
        });
        return;
      }
      if (data) {
        this.setState({
          staffId: staffId,
          error: null,
          bookings: data
        });
      }
    });
  }

  onCancelBooking(id) {
    this.api.cancelBooking(id, error => {
      if (error) {
        this.setState({
          error: error,
          bookings: []
        });
      } else {
        // 200
        this.setState({
          showBookingCancelSuccess: true
        });
      }
    });
  }

  onAcknowledgeCanceled() {
    this.setState({ showBookingCancelSuccess: false });
  }

  createTableRowData() {
    const bookings = this.state.bookings;
    return bookings.map(b => {
      return {
        bookingId: b.bookingId,
        startDate: b.startDate,
        endDate: b.endDate,
        city: b.workspace.floor.city,
        workspaceId: b.workspace.workspaceId,
        // TODO: Implement confirmation
        status: "Confirmed",
        officeOwner: b.workspace.staff.firstName + " " + b.workspace.staff.lastName
      };
    });
  }

  render() {
    const { classes } = this.props;
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return (
      <div>
        <FormControl onSubmit={this.onSubmitStaffId} className={`${classes.where}`}>
          <TextField id="standard-basic" label="StaffId" />
          <Button className={`${classes.buttonOne}`} type="submit" name="staffId" variant="contained">
            Submit
          </Button>
        </FormControl>
        <BookingsTable onCancelBooking={this.onCancelBooking} rows={this.createTableRowData()}></BookingsTable>
      </div>

      // {/*<React.Fragment>*/}
      // {/*  <h4>PUT YOUR StaffID</h4>*/}
      // {/*  <form>*/}
      // {/*    <label>*/}
      // {/*      <input className={`${classes.inputOne}`} type="text" name="staffID" />*/}
      // {/*    </label>*/}
      // {/*    <button type="submit" value="staffId" />*/}
      // {/*  </form>*/}
      // {/*</React.Fragment>*/}
    );
  }
}

const withdrawSty = {
  inputOne: { position: "absolute", height: "35px", width: "200px" },
  buttonOne: { height: "25px", width: "60px", marginLeft: "65%", fontSize: 10, backgroundColor: "#008CBA" }
};

// export default Withdraw;
export default withStyles(withdrawSty)(Withdraw);
