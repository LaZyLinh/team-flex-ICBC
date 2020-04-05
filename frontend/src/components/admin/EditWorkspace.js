import React from "react";
import { deleteWorkspace, getWorkspacesByFloorId } from "../../api/AdminApi";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import workSpaceTable from "../display/workSpaceTable"

 class EditWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      deleteButtonClicked: false
    };
  }

  async componentDidMount() {
    this.setState({
      // workspaces: await getWorkspacesByFloorId(this.props.floorId)
      workspaces: await getWorkspacesByFloorId(1)
    });
    console.log(this.state.workspaces);
  }

  showWorkspace = workspace => {
    const workspaceId = workspace.WorkspaceId;

    const workspaceName = workspace.WorkspaceName;
    return (
      <React.Fragment key={workspaceId}>
        <h3>Workspace: {workspaceName}</h3>
        <div
          style={{
            width: "20%",
            display: "inline-block",
            marginLeft: "10%",
            textAlign: "center"
          }}
        ></div>
        <br />
        <br />
        <hr />
      </React.Fragment>
    );
  };

  showWorkspaces = () => {
    if (0 === 0) {
      // if (this.state.workspaces.length == 0) {
      return <h2>No workspaces have been added.</h2>;
    } else {
      const workspaces = this.state.workspaces;
      return Object.values(workspaces).map(this.showWorkspace);
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

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment >

        <div className={`${classes.backgroundSty}`} >
          <h1 style={{color:"white", position:"absolute",left:"2.78%",top:"20px"}}>Edit Workspace</h1>
        </div>
          <div className={`${classes.imgBox}`}>
              <h1>Place Image</h1>
          </div>
          <Button  className={`${classes.uploadMapBut}`}>Upload New Map</Button>
          <Button  className={`${classes.uploadCSVBut}`}>Upload New Work Station CVS File</Button>
          <div className={`${classes.tableBox}`}>
              <workSpaceTable rows={this.state.workspaces}/>
          </div>

      </React.Fragment >
    );
  }}
  const editWsStyle={
      backgroundSty:{
          backgroundColor:"#002D7D",
          position:"absolute",
          width:"100%",
          height:"100%",
          margin:"0%",
          left: "0%",
          top: "0%"

      },
      imgBox:{
          backgroundColor: "#EBF0F8",
          height: "40%",
          width:"26%",
          position:"absolute",
          left:"8%",
          top:"15%"
      },
      uploadMapBut:{
          backgroundColor:"#EBF0F8",
          position:"absolute",
          top:"60%",
          left:"10%",
          width:"22%",
          height:"7%"
      },
      uploadCSVBut:{
          backgroundColor:"#EBF0F8",
          position:"absolute",
          top:"70%",
          left:"10%",
          width:"22%",
          height:"7%"
      },
      tableBox:{
          backgroundColor:"#EBF0F8",
          position:"absolute",
          left:"49%",
          top:"100px",
          width:"35%",
          height:"75%"

      },
      tableSty:{
          position:"relative",
          left:"49%",
          top:"100px",
          width:"32%",
          height:"70%"
      }
    };

export default withStyles(editWsStyle)(EditWorkspace);
