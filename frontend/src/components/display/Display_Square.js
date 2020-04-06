import React from "react";
import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";
import { deleteLocationName } from "../../api/AdminApi";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const EDIT_FLOORS_PATH = "/admin/edit-floors/";

class Display_Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteClicked: {} // map
    };
  }

  onClickLocation = location => () => {
    console.log("onClickLocation: " + location);
    window.location.href = EDIT_FLOORS_PATH + location;
  };

  onClickDelete = location => () => {
    console.log("onClickDelete: " + location);
    const deleteClicked = this.state.deleteClicked;
    deleteClicked[location] = true;
    this.setState({ deleteClicked });
  };

  onClickConfirmDelete = location => async () => {
    console.log("onClickConfirmDelete: " + location);
    await deleteLocationName(location);
    await this.props.updateLocations();
  };

  showDeleteButton = location => {
    if (this.state.deleteClicked[location]) {
      return (
        <Button
          variant="contained"
          style={{ width: "200px" }}
          color="secondary"
          size="small"
          onClick={this.onClickConfirmDelete(location)}
        >
          Confirm Delete
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{ width: "200px" }}
          color="secondary"
          size="small"
          onClick={this.onClickDelete(location)}
        >
          Delete
        </Button>
      );
    }
  };

  onCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row" alignItems="center" justify="center">
        {this.props.locations.map((location, i) => {
          return (
            <Grid
              item
              container
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                className={`${classes.eachPart}`}
                onClick={this.onClickLocation(location)}
              >
                <h1
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "50%",
                    color: "white"
                  }}
                >
                  {location}
                </h1>
              </Button>
              <div />
              {this.showDeleteButton(location)}
              <div style={{ height: "20px" }} />
              {/* <Snackbar
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center"
                }}
                open={this.state.openSnackbar}
                autoHideDuration={6000}
                message="Location deleted (restore by re-adding this location)"
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.onCloseSnackbar}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              /> */}
            </Grid>
          );
        })}
      </Grid>
    );
  }
}
const DisplayStyle = {
  eachPart: {
    backgroundColor: "#002D7D",
    width: "200px",
    height: "200px"
  }
};
export default withStyles(DisplayStyle)(Display_Square);
