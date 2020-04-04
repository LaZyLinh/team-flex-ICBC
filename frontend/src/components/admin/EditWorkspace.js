import React from "react";
import { deleteWorkspace, getWorkspacesByFloorId } from "../../api/AdminApi";
import Button from "@material-ui/core/Button";


export default class EditWorkspace extends React.Component {
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
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment >
        <div >
          <h1 style={{ color: "white", position: "absolute", left: "2.78%", fontSize: 48 }}>
            Admin - Edit Workspace: <em>{this.props.workspaceId}</em>
          </h1>
        </div>
        <div style={{ position: "absolute", top: "100px" }}>{this.showWorkspaces()} </div>
        <div style={{ position: "absolute", top: "120px", left: "70%" }}>
          <Button style={{ fontSize: 15 }} variant="contained" color="secondary" onClick={this.onClickDelete}>
            Delete Workspace
          </Button>
        </div>
        {this.showSecondDeleteButtonIfNeeded()}
      </React.Fragment >
    );
  }




}
