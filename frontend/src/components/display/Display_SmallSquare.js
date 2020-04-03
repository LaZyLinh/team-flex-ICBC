import React from "react";
import OfficeLending from "../../api/OfficeLendingApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";

class Display_SmallSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lending: []
    };
    this.getLending = this.getLending.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  async getLending() {
    const lendingHistory = OfficeLending.getAvailabilitiesByOwnerID(5008);
    let Lend = [];
    await Promise.all([lendingHistory]).then(messages => {
      Lend = messages[0];
      this.setState({ Lending: Lend });
    });
    console.log("Lending History");
    console.log(this.state.Lending);
  }

  handleDelete(availabilityId) {
    console.log(availabilityId);
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want delete this availability?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => await OfficeLending.cancelAvailability(availabilityId)
        },
        {
          label: "No",
          onclick: () => alert("Do not delete")
        }
      ]
    });
  }

  processLending(eachOne) {
    eachOne.startDate.toString();
    eachOne.endDate.toString();
    console.log(typeof eachOne.startDate);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" style={{ width: "100%" }} onClick={this.getLending}>
          Show My Lending history
        </Button>

        {this.state.Lending.map(function(eachLend, i) {
          return (
            <div className={`${classes.eachOne}`}>
              <div className={`${classes.eachPart}`}>
                <h1 key={i} style={{ fontSize: "10px", position: "relative", top: "10%", color: "white" }}>
                  {"start:" + eachLend.startDate.toString().substring(4, 24)}
                </h1>
                <h1 key={i} style={{ fontSize: "10px", position: "relative", top: "0%", color: "white" }}>
                  {"end:" + eachLend.endDate.toString().substring(4, 24)}
                  <DeleteIcon
                    style={{ color: "white", fontSize: "15px", position: "relative", left: "10%", bottom: "50%" }}
                    // onClick={() => this.handleDelete(eachLend.availabilityId)}
                      onClick={() => OfficeLending.cancelAvailability(eachLend.availabilityId)}
                  ></DeleteIcon>
                </h1>

                {/*<DeleteIcon style={{ color: "white", fontSize: "10px", position: "relative", bottom: "50%" }} />*/}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const DisplayStyle = {
  eachOne: {
    width: "33%",
    display: "inline-block",
    marginLeft: "15%",
    textAlign: "center"
  },
  eachPart: {
    backgroundColor: "#002D7D",
    width: "200px",
    height: "50px"
  }
};
export default withStyles(DisplayStyle)(Display_SmallSquare);
