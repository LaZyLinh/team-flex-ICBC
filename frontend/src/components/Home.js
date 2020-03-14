import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { GiCalendar, GiDesk, GiChecklist } from "react-icons/gi";
import logo from "../assets/home_logo.png";

class Home extends React.Component {
  render() {
    console.log(this.props.userInfo);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.background}></div>
        <div>
          <img className={classes.logo} src={logo} alt="Logo"></img>
          <Button className={classes.adminButton} href="/admin" variant="outlined" color="primary">
            Admin Portal
          </Button>
        </div>
        <Grid container className={classes.container} spacing={2}>
          <Grid className={classes.item} item xs={4}>
            <Button href="/availabilities" className={classes.button}>
              <div>
                <GiCalendar className={classes.icon} />
                <div className={classes.buttonText}>Lend Office</div>
              </div>
            </Button>
          </Grid>
          <Grid className={classes.item} item xs={4}>
            <Button href="/bookings" className={classes.button}>
              <div>
                <GiDesk className={classes.icon} />
                <div className={classes.buttonText}>Book Office</div>
              </div>
            </Button>
          </Grid>
          <Grid className={classes.item} item xs={4}>
            <Button href="/withdraw" className={classes.button}>
              <div>
                <GiChecklist className={classes.icon} />
                <div className={classes.buttonText}>Manage Bookings and Lendings</div>
              </div>
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const muiStyles = {
  background: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)",
    backgroundSize: "cover"
  },
  logo: {
    position: "absolute",
    left: "7%",
    top: "7%",
    height: "16%",
    width: "18%"
  },
  adminButton: {
    fontFamily: "Inter",
    color: "#0A65FF",
    border: "1px solid rgba(10, 101, 255, 0.5)",
    position: "absolute",
    right: "7%",
    top: "10%",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)"
    }
  },
  container: {
    justifyContent: "center",
    padding: "20% 10% 0% 10%",
    width: "100vw",
    height: "100vh"
  },
  item: {
    textAlign: "center"
  },
  button: {
    height: "50vh",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderTop: "5px solid #2E3B52",
    transition: "transform 0.5s ease-in-out",
    "&:hover": {
      transform: "translateY(-3vh);",
      color: "#F4F7FC"
    },
    boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.2)"
  },
  icon: {
    fontSize: "6em"
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: "1.2em"
  }
};

export default withStyles(muiStyles)(Home);
