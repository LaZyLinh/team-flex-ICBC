import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {Input} from "@material-ui/core";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [value, enterValue] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    enterValue(value);
    console.log(value);
  };

  return (
    <div>
      <AddCircleIcon
        style={{ color: "white", fontSize: "40px", position: "absolute", right: "10%", top: "30%" }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Open form dialog
      </AddCircleIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new Location</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the name of new Location</DialogContentText>

          <Input />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
