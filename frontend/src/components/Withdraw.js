import React from "react";
import OfficeBookingApi from "../api/OfficeBookingApi";
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
    const { classes } = this.props;
    // TODO:
    // Always show the user Id entry field
    // Show error message if this.state.error
    // Show successfully canceled booking if this.state.showBookingCancelSuccess
    // Otherwise, show this.state.bookings in dynamically generated list
    return (
        <FormControl onSubmit={this.onSubmitStaffId} className={`${classes.where}`}>
            <TextField id="standard-basic" label="StaffId" />
          <Button className={`${classes.buttonOne}`}type="submit" name = "staffId" variant="contained">Submit</Button>
        </FormControl>

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
  inputOne: { position: "absolute", height: "35px", width:"200px" },
  buttonOne: {height: "25px",
               width:"60px",
             marginLeft:"65%",
             fontSize:10,
             backgroundColor:"#008CBA"
    }
};

// export default Withdraw;
export default withStyles(withdrawSty)(Withdraw);
