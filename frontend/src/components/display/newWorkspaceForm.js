import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { uploadFloorData } from '../../api/AdminApi'

class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            floorId: props.floorIdFromMain,
            open: false,
            errMsg: ""
        }
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState(prevState => {
            return { open: !prevState.open };
        });
    };

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    }

    handleSubmit = async (event) => {
        // TODO send upload file request
        try {
            await uploadFloorData(this.state.floorId, this.state.file);
            this.setState({ errMsg: "" })
            this.setState(prevState => {
                return { open: !prevState.open };
            });
            window.location.reload();
        } catch (err) {
            console.log(err)
            this.setState({ errMsg: "there is an error uploading csv" })
        }
    }

    render() {
        return (
            <div>
                <Button style={{ position: "absolute", right: "0%", top: "2.7%" }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Upload Workspaces CSV
            </Button>
                <Dialog TransitionComponent={Transition} open={this.state.open}
                    onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add workspace</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the following information to add a new workspace
                    </DialogContentText>
                        <input
                            name="Workspaces CSV file"
                            type="file"
                            onChange={this.handleFileChange}
                            margin="none"
                            required></input>
                    </DialogContent>
                    <DialogContentText style={{ color: "red", paddingLeft: "5%" }}>
                        {this.state.errMsg}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default FormDialog;
