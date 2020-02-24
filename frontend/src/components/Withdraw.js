import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.api = new OfficeBookingApi();
    this.state = {
      staffId: -1,
      bookings: [],
      error: null,
      showBookingCancelSuccess: false
    };
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

  render() {
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return <div></div>;
  }
}

export default Withdraw;
