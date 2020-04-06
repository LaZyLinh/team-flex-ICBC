import React from "react";
import { updateWorkspace, getFloorsByCity, deleteWorkspace, getWorkspacesByFloorId } from "../../api/AdminApi";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import WorkspaceTable from "../display/WorkspaceTable";
import FormDialog from "../display/newWorkspaceForm"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from '@material-ui/core/TextField';

class EditWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorId: props.floorId,
      editPopup: false,
      workspaces: [],
      deleteButtonClicked: false,
      editWorkspace: [],
      errorMsg: ""
    };
  }



  async componentWillMount() {
    this.setState({
      workspaces: await getWorkspacesByFloorId(this.props.floorId)
      // workspaces: await getWorkspacesByFloorId(1)
    });

  }

  editWorkspacePopup = (workspace) => {
    this.setState({ editPopup: true, editWorkspace: workspace })
  }

  showWorkspace = workspace => {
    const workspaceId = workspace.WorkspaceId;

    const workspaceName = workspace.WorkspaceName;
    return (

      <tr key={workspaceId} >
        <th>
          <input name={workspaceId + "_checkbox"} type="checkbox"></input>
        </th>
        <th>{workspace.WorkspaceId}</th>
        <th>{workspace.WorkspaceName}</th>
        <th>{workspace.StaffId}</th>
        <th>{workspace.Location}</th>
        <th>{workspace.City}</th>
        <th>{workspace.Building}</th>
        <th>{workspace.FirstName + " " + workspace.LastName}</th>
        <th>{workspace.ICBCEmployeeId}</th>
      </tr>
    );
  };

  showWorkspaces = () => {
    // if (0 === 0) {
    if (this.state.workspaces.length == 0) {
      return <h2>No workspaces have been added.</h2>;
    } else {
      const workspaces = this.state.workspaces;
      return (
        <div style={{
          height: "90%",
          overflowY: "scroll",
          textAlign: "center"
        }}>
          <table style={{ backgroundColor: "#7D90B2", width: "100%", border: "none", cellspacing: "0", cellpadding: "0" }}>
            <tr key="floor_title" style={{
              fontSize: "15px", backgroundColor: "white", width: "100%",
              paddingLeft: "5%", height: "26px", border: "1px"
            }}>
              <th></th>
              <th>Workspace ID</th>
              <th>Workspace Name</th>
              <th>Owner Staff ID</th>
              <th>Location</th>
              <th>City</th>
              <th>Building</th>
              <th>Owner Name</th>
              <th>ICBCEmployeeId</th>
            </tr>{Object.values(workspaces).map(this.showWorkspace)}</table>
        </div>);
    }
  };

  onClickDelete = () => {
    this.setState({
      deleteButtonClicked: true
    });
  };

  onClickConfirmDelete = async () => {
    await deleteWorkspace(this.props.workspaceId);
    window.location.href = "/adminPage";
  };

  showSecondDeleteButtonIfNeeded = () => {
    if (this.state.deleteButtonClicked) {
      return (
        <div style={{ position: "absolute", top: "175px", left: "70%" }}>
          <Button style={{ fontSize: 28 }} variant="contained" color="secondary" onClick={this.onClickConfirmDelete}>
            Confirm Delete?
                    </Button>
          <div>
            <h1>Show Image</h1>
          </div>
        </div>
      );
    }
  };

  reloadCallback = () => {
    window.location.reload();
  }

  handleClosePopup = () => {
    this.setState(prevState => {
      return { editPopup: !prevState.editPopup };
    });
  }

  handleSubmit = async (workspaceId) => {
    console.log(this.state.newEmail)
    try {
      await updateWorkspace(workspaceId, this.state.newEmail);
      this.setState(prevState => {
        return { editPopup: !prevState.editPopup };
      });
      this.reloadCallback();
    } catch (err) {
      console.log(err);
      this.setState({ errorMsg: "update workspace failed!" })
    }

  }

  handleEmailChange = (event) => {
    const target = event.target;
    const value = target.value;
    if (value) {
      this.setState({
        newEmail: value
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment >

        <div className={`${classes.backgroundSty}`} >
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", top: "20px" }}>Edit Workspace</h1>

          <div className={`${classes.imgBox}`}>
            <img
              className={`${classes.floorplanImg}`}
              src={`https://icbcflexwork.me:8080/floorplans/${this.state.floorId}.jpg`}
              alt="No FloorPlan found"
            />
          </div>
          {/* <Button className={`${classes.uploadCSVBut}`}>Upload New Work Station CVS File</Button> */}
          <div className={`${classes.tableBox}`}>
            <div style={{ dispaly: "flex", paddingTop: "15px", paddingBottom: "15px" }}>
              <span style={{ fontSize: "25px", marginLeft: "2%", widith: "50%", }}>WorkSpace Table</span>
              {/*<Button className={classes.bButton} onClick={this.addFloorHandler} variant="outlined" color="primary">*/}
              {/*Add new Workspace*/}
              {/*</Button></div>*/}

              {/*<Button className={classes.cButton} onClick={this.addFloorHandler} variant="outlined" color="primary">*/}
              {/*delete selected workspace*/}
              {/*</Button>*/}
              {/*{this.showWorkspaces()}</div>*/}
              <FormDialog floorIdFromMain={this.state.floorId} reloadCallback={this.reloadCallback} />
            </div>


            <WorkspaceTable rows={this.state.workspaces} reloadCallback={this.reloadCallback} showEditPopup={this.editWorkspacePopup} /></div>
          <Dialog
            TransitionComponent={Transition}
            open={this.state.editPopup}
            onClose={this.handleClosePopup}
            PaperProps={{
              style: {
                backgroundColor: "#EBF2FF",
                height: "40%",
                width: "30%"
              }
            }}>
            {/* TODO finsihed this part */}
            <DialogTitle className={classes.dialogTitle} disableTypography={true}>
              {this.state.editWorkspace ? "Edit Workspace " + this.state.editWorkspace.wsId : "Edit Workspace"}
            </DialogTitle>
            <DialogContent>
              {/*<p style={{lineHeight:"20px"}}>*/}
              <h4 style={{ position: "absolute", left: "15%", width: "50%", top: "10%" }} >{"City: " + this.state.editWorkspace.city}</h4>
              <h4 style={{ position: "absolute", left: "55%", width: "50%", top: "10%" }}>{"Location: " + this.state.editWorkspace.loc}</h4>
              <h4 style={{ position: "absolute", left: "15%", width: "50%", top: "22%" }}>{"Owner: " + this.state.editWorkspace.officeOwner}</h4>
              <h4 style={{ position: "absolute", left: "55%", width: "50%", top: "22%" }}>{"staffID: " + this.state.editWorkspace.staffId}</h4>
              <h4 style={{ position: "absolute", left: "15%", width: "50%", top: "34%" }}>{"FloorID: " + this.state.editWorkspace.fId}</h4>
              <h4 style={{ position: "absolute", left: "55%", width: "50%", top: "34%" }}>{"FloorNo: " + this.state.editWorkspace.fNo}</h4>
            </DialogContent>
            <h4 style={{ position: "absolute", bottom: "25%", left: "15%" }}> Assign it to someone else: </h4>
            <DialogContentText style={{ width: "70%", position: "absolute", left: "15%", bottom: "10%" }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                onChange={this.handleEmailChange}
                fullWidth
              /></DialogContentText>
            <DialogActions>
              <Button color="primary" onClick={this.handleClosePopup}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => this.handleSubmit(this.state.editWorkspace.wsId)}>
                Confirm
              </Button>
              <p style={{ color: "red", paddingLeft: "5%" }}>{this.state.errorMsg}</p>
            </DialogActions>
          </Dialog>
        </div>




      </React.Fragment >
    );
  }
}
const editWsStyle = {
  backgroundSty: {
    backgroundColor: "#002D7D",
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: "0%",
    left: "0%",
    top: "0%"

  },
  floorplanImg: {
    height: "100%",
    width: "100%"
  },
  imgBox: {
    textAlign: "center",
    alignContent: "center",
    backgroundColor: "#EBF0F8",
    height: "50%",
    width: "40%",
    position: "absolute",
    left: "2%",
    top: "15%"
  },
  uploadCSVBut: {
    backgroundColor: "#EBF0F8",
    position: "absolute",
    top: "73%",
    left: "13%",
    width: "340px",
    height: "60px"
  },
  tableBox: {
    backgroundColor: "#EBF0F8",
    position: "absolute",
    right: "5%",
    top: "100px",
    width: "50%",
    height: "80%",
    dispaly: "flex"
  },
  bButton: {
    color: "#002D7D",
    border: "1px solid rgba(10, 101, 255, 0.5)",
    boxShadow: "0px 1px 1px",
    paddingBottom: "10px",
    marginLeft: "30%",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)"
    }
  },
  formSty: {
    position: "absolute",
    right: "60%",
    top: "30%"
  },
  cButton: {
    color: "#002D7D",
    border: "1px solid rgba(10, 101, 255, 0.5)",
    boxShadow: "0px 1px 1px",
    marginRight: "1%",
    paddingBottom: "10px",
    paddingRight: "1%",
    float: "right",
    "&:hover": {
      border: "1px solid rgba(10, 101, 255, 1)"
    }
  },
  // windowText:{
  // position:"absolute",
  //     left:"15%",
  //     width:"100%",
  //
  //
  // }

};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default withStyles(editWsStyle)(EditWorkspace);

