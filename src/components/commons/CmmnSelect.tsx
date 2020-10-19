import React, { forwardRef } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  customSelect: {
    height: "45px",
  },
}));

interface keyValueProps {
  key: string;
  value: string;
}
interface CmmnSelectProps {
  label: string;
  value: string | number;
  onChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
  firstItem?: "All" | "Select";
  itemList: any;
  keyValue: keyValueProps;
}

const CmmnSelect = forwardRef(
  (
    { label, value, onChange, firstItem, itemList, keyValue }: CmmnSelectProps,
    ref: any
  ) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
      <FormControl
        variant="outlined"
        className={classes.formControl}
        fullWidth
        ref={ref}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          {t(label)}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          className={classes.customSelect}
        >
          {firstItem && (
            <MenuItem value={firstItem} selected>
              {t(firstItem)}
            </MenuItem>
          )}
          {itemList &&
            itemList.map((row: any) => (
              <MenuItem key={row.key} value={row[keyValue.key]}>
                {row[keyValue.value]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
);

export default CmmnSelect;
