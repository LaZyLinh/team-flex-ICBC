import React from "react";
import OfficeLending from "../../api/OfficeLendingApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

class Display_SmallSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lending: []
    };
    this.getLending = this.getLending.bind(this);
  }
  async getLending() {
    const lendingHistory = OfficeLending.getAvailabilitiesByOwnerID(2);
    let Lend;
    await Promise.all([lendingHistory]).then(messages => {
      console.log(messages.length);
      Lend = messages[0];
    });
    console.log(Lend);
    this.setState({ Lending: Lend });
    console.log(this.processLending(this.state.Lending[0]));
  }

  processLending(EachOne) {
    return EachOne.StartDate.substring(0, 10) + " To " + EachOne.EndDate.substring(0, 10);
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
                <h1 style={{ fontSize: "10px", position: "relative", top: "50%", color: "white" }}>
                  {eachLend.StartDate.substring(0, 10) + " To " + eachLend.EndDate.substring(0, 10)}
                </h1>
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
