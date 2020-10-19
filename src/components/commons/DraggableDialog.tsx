import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function DraggableDialog({
  openDialog,
  handleYesDialog,
  handleCloseDialog,
  alertTitle,
  alertMsg,
}: any) {
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {alertTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{alertMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleYesDialog} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DraggableDialog;
