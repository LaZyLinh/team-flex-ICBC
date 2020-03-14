import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { GiCalendar, GiDesk, GiChecklist } from "react-icons/gi";
import logo from "../assets/home_logo.png";
import styles from "../styles/Home.styles";

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

export default withStyles(styles)(Home);
