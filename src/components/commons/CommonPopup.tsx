import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxWidth: 960,
      maxHeight: 800,
      overflow: "auto",
    },
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
    },
    customButton3: {
      width: "6vw",
      minWidth: "60px",
      height: "3.3vh",
      marginLeft: theme.spacing(1),
    },
    bottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    uploadBottom: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "5px",
    },
    gridCustom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
    },
    customCardContent: {
      padding: "16px 0",
    },
    container: {
      maxHeight: 220,
    },
  })
);

function CommonPopup({ width, height, open, handleClose, children }: any) {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{ width, height }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Grid container spacing={2}>
              {children}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default CommonPopup;
