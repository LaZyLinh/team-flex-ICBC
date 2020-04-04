import React from "react";
import OfficeLending from "../../api/OfficeLendingApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import ApiClient from "../../ApiClient";
import Lending from "../Lending";

class Display_SmallSquare extends React.Component {
  constructor(props) {
     super(props);
    this.state = {
      Lending: [],
        staffId:""
    };
    this.getLending = this.getLending.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
    // componentDidMount = async ()=>{
    //     const userInfo = await ApiClient.instance.callApi(
    //         "/auth/user",
    //         "POST",
    //         {},
    //         {},
    //         { Authorization: "Bearer " + this.props.accountInfo.jwtIdToken },
    //         { Email: this.props.accountInfo.account.userName },
    //         null,
    //         [],
    //         ["application/x-www-form-urlencoded"],
    //         ["application/json"],
    //         Object,
    //         null
    //     );
    //     console.log(userInfo);
    //     this.setState({
    //         staffId:userInfo.StaffId,
    //     });
    //     console.log(this.state.staffId);
    // };

  async getLending() {
    console.log(this.props.staffIdFromMain)
    const Lend=  await OfficeLending.getAvailabilitiesByOwnerID(this.props.staffIdFromMain);
    this.setState({Lending:Lend});

  }

  refreshPage() {
    window.location.reload(false);
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
                  {"start:" + eachLend.startDate.toString().substring(4, 16)}
                </h1>
                <h1 key={i} style={{ fontSize: "10px", position: "relative", top: "0%", color: "white" }}>
                  {"end:" + eachLend.endDate.toString().substring(4, 16)}
                  <DeleteIcon
                    style={{ color: "white", fontSize: "15px", position: "relative", left: "10%", bottom: "50%" }}
                    // onClick={() => this.handleDelete(eachLend.availabilityId)}
                    onClick={async () => {
                      await OfficeLending.cancelAvailability(eachLend.availabilityId);
                      window.location.reload(false);
                    }}
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
  },
  refresh: {
    textColor: "blue",
    position: "relative",
    top: "40%"
  }
};
export default withStyles(DisplayStyle)(Display_SmallSquare);
