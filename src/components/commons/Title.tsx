import React from "react";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100% !important",
    },
  })
);

function Title({ children }: any) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.root}
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
    >
      {children}
    </Typography>
  );
}

export default Title;
