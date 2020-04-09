import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { getLocations2, createLocation2, deleteLocationName } from "../../../api/AdminApi";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const MAX_CITY_NAME_LENGTH = 50;
const EDIT_FLOORS_PATH = "/admin/edit-floors/";
const COLUMNS = [{ title: "City", field: "city" }];

export default class ManageLocations extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      cityToDelete: "",
      openDeleteDialog: false,
      snackbar: {
        open: false,
        message: "",
        severity: ""
      }
    };
  }

  handleNewLocation = async ({ city }) => {
    try {
      const newLocation = city.trim();
      if (newLocation.length > MAX_CITY_NAME_LENGTH) {
        this.setState({
          snackbar: {
            open: true,
            message: `Please keep city name length under ${MAX_CITY_NAME_LENGTH} characters.`,
            severity: "error"
          }
        });
        return;
      }
      await createLocation2(newLocation);
      this.setState({ snackbar: { open: true, message: `Successfully created ${newLocation}!`, severity: "success" } });
      await this.updateLocations();
    } catch (err) {
      this.setState({
        snackbar: { open: true, message: `There is already an identical location.`, severity: "error" }
      });
    }
  };

  updateLocations = async () => {
    this.setState({ data: await getLocations2() });
  };

  componentDidMount = async () => {
    const data = await getLocations2();
    this.setState({ data });
  };

  onCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbar: { open: false } });
  };

  handleDeleteLocationConfirmed = async () => {
    try {
      await deleteLocationName(this.state.cityToDelete);
      await this.updateLocations();
      this.setState({
        openDeleteDialog: false,
        snackbar: { open: true, message: `Successfully deleted ${this.state.cityToDelete}!`, severity: "info" }
      });
    } catch (err) {
      this.setState({
        openDeleteDialog: false,
        snackbar: { open: true, message: `Deletion unsuccessful`, severity: "error" }
      });
    }
  };

  handleDeleteLocation = async ({ city }) => {
    this.setState({ cityToDelete: city, openDeleteDialog: true });
  };

  onRowClick = (event, selectedRow) => {
    console.log(selectedRow);
    window.location.href = EDIT_FLOORS_PATH + selectedRow.city;
  };

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title=""
          columns={COLUMNS}
          data={this.state.data}
          editable={{
            isDeletable: () => true,
            onRowAdd: this.handleNewLocation,
            onRowDelete: this.handleDeleteLocation
          }}
          onRowClick={this.onRowClick}
        />
        <Snackbar open={this.state.snackbar.open} autoHideDuration={6000} onClose={this.onCloseSnackbar}>
          <Alert onClose={this.onCloseSnackbar} severity={this.state.snackbar.severity}>
            {this.state.snackbar.message}
          </Alert>
        </Snackbar>
        <Dialog
          open={this.state.openDeleteDialog}
          onClose={() => this.setState({ openDeleteDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"This action is undoable!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you absolutely sure you want to delete{" "}
              <span style={{ color: "blue" }}>{this.state.cityToDelete}</span>? It will{" "}
              <span style={{ color: "red" }}>delete all bookings</span> at this location. Employees with active bookings
              will receive email notification.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openDeleteDialog: false })} color="primary">
              No
            </Button>
            <Button onClick={this.handleDeleteLocationConfirmed} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
