import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";
import BookingsTable from "./Withdraw/BookingsTable";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

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
    this.onSubmitStaffId = this.onSubmitStaffId.bind(this);
  }

  onSubmitStaffId(event) {
    event.preventDefault();
    const staffId = this.state.staffId;
    this.api.getBookingsByUserID(staffId, (error, data) => {
      if (error) {
        console.log("Got an error from API call");
        this.setState({
          error: error,
          bookings: []
        });
        return;
      }
      if (data) {
        this.setState({
          error: null
          // bookings: data
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
        <FilterListIcon className={`${classes.shapeFilter}`} />
        <div className={`${classes.searchBar}`}> </div>
        <form onSubmit={this.onSubmitStaffId} className={`${classes.idSearch}`}>
          <TextField onInput={e => this.setState({ staffId: e.target.value })} type="text" label="ID" name="staffId" />
        </form>
        <SearchIcon className={`${classes.searchIcon}`} />

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
  idSearch: {
    position: "absolute",
    top: "1.2%",
    left: "9%",
    right: "73.61%"
  },
  shapeFilter: {
    position: "absolute",
    left: "2.08%",
    right: "96.53%",
    top: "3.33%",
    bottom: "94.44%",
    color: "#0A65FF"
  },
  searchIcon: {
    position: "absolute",
    left: "6.4%",
    top: "3.2%",
    color: "gray"
  },
  searchBar: {
    position: "absolute",
    left: "5.56%",
    right: "73.61%",
    top: "2.22%",
    bottom: "93.33%",
    background: " #DAE1EC",
    borderRadius: "4px"
  },
  inputOne: { position: "absolute", height: "35px", width: "200px" },
  buttonOne: { height: "25px", width: "60px", marginLeft: "65%", fontSize: 10, backgroundColor: "#008CBA" }
};

// export default Withdraw;
export default withStyles(withdrawSty)(Withdraw);
