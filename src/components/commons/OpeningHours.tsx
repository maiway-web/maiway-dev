import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  textField: {
    width: 120,
    fontSize: "0.8rem",
  },
});

const columns = [
  { id: "No", align: "center", label: "Time" },
  { id: "Monday", align: "center", label: "Mon" },
  {
    id: "Tuesday",
    align: "center",
    label: "tue",
  },
  {
    id: "Wednesday",
    align: "center",
    label: "Wed",
  },
  {
    id: "Thursday",
    align: "center",
    label: "Thu",
  },
  { id: "Friday", align: "center", label: "Fri" },
  {
    id: "Saturday",
    align: "center",
    label: "Sat",
  },
  { id: "Sunday", align: "center", label: "Sun" },
];
let rows: any = [
  {
    No: "Open",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  },
  {
    No: "Close",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  },
];

function padLeftZero(str: number) {
  if (str < 10) {
    return `0${str}`;
  }
  return `${str}`;
}
function transTime(time: string) {
  const arrTime = time.split(":");
  let hour = parseInt(arrTime[0], 10);
  if (hour >= 12) {
    hour = hour - 12;
    return `${padLeftZero(hour)}:${arrTime[1]}PM`;
  } else {
    return `${time}AM`;
  }
}
interface OpeningHoursProps {
  opening_hours: string[];
}
function OpeningHours({ opening_hours }: OpeningHoursProps) {
  const classes = useStyles();

  const arrHours = opening_hours[0].split(",");
  if (arrHours.length > 1) {
    arrHours.forEach((openingHour) => {
      openingHour = openingHour.trim();
      const arrOpen = openingHour.split("(");
      const dayOfWeek = arrOpen[0].trim();
      const arrTime = arrOpen[1].replace(")", "").split("-");
      let openTime: string | number = arrTime[0].trim().replace("AM", "");
      let closeTime: string | number = arrTime[1].trim().replace("AM", "");

      if (openTime.indexOf("PM") !== -1) {
        const arrOpenTime = openTime.replace("PM", "").split(":");
        openTime = `${(parseInt(arrOpenTime[0], 10) + 12).toString()}:${
          arrOpenTime[1]
        }`;
      }
      if (closeTime.indexOf("PM") !== -1) {
        const arrCloseTime = closeTime.replace("PM", "").split(":");
        closeTime = `${(parseInt(arrCloseTime[0], 10) + 12).toString()}:${
          arrCloseTime[1]
        }`;
      }
      rows[0][dayOfWeek] = openTime.toString();
      rows[1][dayOfWeek] = closeTime.toString();
    });
  }

  const timeOnChange = (ev: any, rowIdx: number, key: string) => {
    // console.log(ev.currentTarget.value, rowIdx, key);
    rows[rowIdx][key] = ev.currentTarget.value;
    const keys = Object.keys(rows[0]);
    // console.log(keys);
    let result = "";
    for (let i = 1; i < keys.length; i++) {
      if (rows[0][keys[i]] !== "" && rows[1][keys[i]] !== "") {
        result += `${result === "" ? "" : ", "}${keys[i]} (${transTime(
          rows[0][keys[i]]
        )} - ${transTime(rows[1][keys[i]])})`;
      }
    }
    console.log(result);
  };
  return (
    <Paper className={classes.root}>
      <Typography>Opening hours</Typography>
      <TableContainer style={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, rowIdx: number) => {
              return (
                <TableRow hover tabIndex={-1} key={row.No}>
                  {columns.map((column: any) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "No" ? (
                        <TextField
                          type="text"
                          style={{ width: 60 }}
                          value={row[column.id]}
                          disabled
                        />
                      ) : (
                        <TextField
                          type="time"
                          defaultValue={row[column.id]}
                          className={classes.textField}
                          disabled
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={(ev: any) =>
                            timeOnChange(ev, rowIdx, column.id)
                          }
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default OpeningHours;
