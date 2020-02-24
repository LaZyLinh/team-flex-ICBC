import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";
import BookingsTable from "./Withdraw/BookingsTable";

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
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return (
      <div>
        <BookingsTable onCancelBooking={this.onCancelBooking} rows={this.createTableRowData()}></BookingsTable>
      </div>
    );
  }
}

export default Withdraw;
