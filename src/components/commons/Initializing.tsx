import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      top: "50%",
      left: "50%",
      zIndex: 999,
      transform: "Translate(-50%, -50%)",
    },
  })
);

const Initializing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>Initializing...</span>
    </div>
  );
};

export default Initializing;
