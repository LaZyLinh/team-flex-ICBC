import React from "react";
import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";
import { deleteLocationName } from "../../api/AdminApi";

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

  onHover = () => {
    this.setState();
  };

  showCorrectButton = location => {
    if (this.state.deleteClicked[location]) {
      return (
        <Button variant="contained" color="secondary" size="small" onClick={this.onClickConfirmDelete(location)}>
          Confirm Delete
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="secondary" size="small" onClick={this.onClickDelete(location)}>
          Delete
        </Button>
      );
    }
  };

  render() {
    const { classes } = this.props;
    // const allLocationsP = OfficeBookingApi.getLocations();
    // Promise.all([allLocationsP]).then(messages => {
    //   // console.log(messages);
    //   const locations = messages[0];
    // });
    return (
      <div>
        {this.props.locations.map((location, i) => {
          return (
            <div className={`${classes.eachOne}`} key={i}>
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
              {this.showCorrectButton(location)}
              <div style={{ height: "20px" }} />
            </div>
          );
        })}
      </div>
    );
  }
}
const DisplayStyle = {
  eachOne: {
    width: "20%",
    display: "inline-block",
    marginLeft: "10%",
    textAlign: "center"
  },
  eachPart: {
    backgroundColor: "#002D7D",
    width: "200px",
    height: "200px"
  }
};
export default withStyles(DisplayStyle)(Display_Square);
