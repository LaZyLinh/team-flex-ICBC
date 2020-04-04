import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";
import OfficeLendingApi from "../api/OfficeLendingApi";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ManageTable from "./display/ManageTable";
import Display_SmallSquare from "./display/Display_SmallSquare";

import Home from "./Home";

import Link from "@material-ui/core/Link";
import ApiClient from "../ApiClient";

class Withdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      // bookings: [],
      // TEST:
      bookings: [],
      error: null,
      showBookingCancelSuccess: false
    };
    this.onCancelBooking = this.onCancelBooking.bind(this);
    this.onSubmitStaffId = this.onSubmitStaffId.bind(this);
  }

   componentDidMount = async ()=>{
       const userInfo = await ApiClient.instance.callApi(
           "/auth/user",
           "POST",
           {},
           {},
           { Authorization: "Bearer " + this.props.accountInfo.jwtIdToken },
           { Email: this.props.accountInfo.account.userName },
           null,
           [],
           ["application/x-www-form-urlencoded"],
           ["application/json"],
           Object,
           null
       );
       console.log(userInfo);
        await this.setState({
           staffId:userInfo.StaffId,
       });
       console.log(this.state.staffId);
   };

  async onSubmitStaffId() {
    console.log("onSubmitStaffId");
    console.log('from AD:');
    console.log(this.state.staffId);
    const staffId = this.state.staffId;
    console.log(staffId);
    const data = await OfficeBookingApi.getBookingsByUserID(staffId);
    console.log(data);
    this.setState({ bookings: data });
    console.log(this.state.bookings);
    // , (error, data) => {
    //   if (error) {
    //     console.log("Got an error from API call");
    //     this.setState({
    //       error: error,
    //       bookings: []
    //     });
    //     return;
    //   }
    //   if (data) {
    //     console.log(data);
    //     this.setState({
    //       error: null
    //       // bookings: data
    //     });
    //   }
    // });
  }

  onCancelBooking(id) {
    console.log("handle delete");
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
    const { classes } = this.props;
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return (
      <div>
        <Link href="/">
          <HomeIcon className={`${classes.shapeFilter}`} />
        </Link>
        <div className={`${classes.lendingHistory}`}>
          <Display_SmallSquare  staffIdFromMain = {this.state.staffId}/>
        </div>
        {/*<form onSubmit={this.onSubmitStaffId} className={`${classes.idSearch}`}>*/}
          {/*<TextField*/}
            {/*onKeyPress={e => this.setState({ staffId: e.target.value })}*/}
            {/*type="text"*/}
            {/*label="ID"*/}
            {/*name="staffId"*/}
          {/*/>*/}
        {/*</form>*/}
          <Button  className={`${classes.searchIcon}`} onClick={()=>this.onSubmitStaffId()}>My Booking History</Button>

        <div className={`${classes.bookingTable}`}>
          <ManageTable  rows={this.state.bookings} />
        </div>
      </div>
    );
  }
}

const withdrawSty = {
  idSearch: {
    position: "absolute",
    top: "33%",
    left: "5%",
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
    left: "3%",
    top: "36%",
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
  bookingTable: {
    position: "absolute",
    top: "40%",
    left: "0%",
    right: "0%"
  },
  lendingHistory: {
    position: "absolute",
    top: "9%"
  }
};

// export default Withdraw;
export default withStyles(withdrawSty)(Withdraw);
