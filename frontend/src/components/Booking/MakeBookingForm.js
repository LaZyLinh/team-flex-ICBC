import React from "react";
import { withStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import { DateRangePicker } from "rsuite";

class MakeBookingForm extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.form}`}>
        <div className={`${classes.inner}`}>
          <h1 className={`${classes.title}`}>Book an office in any ICBC location.</h1>
          <FormControl className={`${classes.where}`}>
            <TextField id="standard-basic" label="Location" />
            <DateRangePicker
              className={`${classes.dateRangePicker}`}
              appearance="subtle"
              size="large"
              placeholder="Select a date range"
            ></DateRangePicker>
          </FormControl>
        </div>
      </div>
    );
  }
}

const muiStyles = {
  dateRangePicker: {
    position: "absolute",
    top: "9vh",
    left: "0",
    right: "0"
  },
  divForPadding: {
    paddingTop: "3vh"
  },
  inner: {
    position: "absolute",
    left: "8%",
    top: "4%",
    right: "20%"
  },
  where: {
    width: "100%",
    top: "10px",
    bottom: "20px",
    lineHeight: "3em"
  },
  title: {
    // fontFamily: "Raleway, sans-serif",
    fontFamily: "Cabin, sans-serif",
    fontSize: "1.8vw"
  },
  form: {
    position: "absolute",
    borderRadius: "7px",
    top: "12%",
    left: "10%",
    height: "40%",
    width: "25%",
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.12)"
  }
};

export default withStyles(muiStyles)(MakeBookingForm);
