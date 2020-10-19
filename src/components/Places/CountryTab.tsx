import React from "react";
import {
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridCustom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textField: {
      height: 300,
      overflowY: "auto",
      marginTop: "3px",
    },
  })
);

interface CountryTabProps {
  value: string;
  descr: string;
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

function CountryTab({ value, descr, name, onChange }: CountryTabProps) {
  const classes = useStyles();

  const onTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.gridCustom}>
          <TextField
            name={`${name}_name`}
            label={`${name.toUpperCase()}_name`}
            fullWidth
            value={value}
            onChange={onTextChange}
          />
        </Grid>
        <TextField
          multiline
          value={descr}
          onChange={onTextChange}
          name={`${name}_descr`}
          label={`${name.toUpperCase()}_descr`}
          fullWidth
          className={classes.textField}
        />
      </Grid>
    </Grid>
  );
}

export default CountryTab;
