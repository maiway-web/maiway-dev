import React, { createRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, CardContent, MenuItem, Select } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  bottom: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  customButton2: {
    width: "6vw",
    minWidth: "40px",
    height: "3vh",
    marginLeft: theme.spacing(1),
  },
}));
let lastHeight = 0;
function DataList2({
  columns,
  rows,
  rowClick,
  selectedID,
  maxHeight,
  page,
  rowsPerPage,
  commonList,
  searchNextClick,
}: any) {
  const classes = useStyles();
  const { t } = useTranslation();
  const tableRef = createRef<any>();

  // const [lastHeight, setLastHeight] = useState(0);
  // const nextOnClick = () => {
  //   // console.log("next");
  //   searchNextClick();
  // };
  // console.log(page);

  if (page === 0) {
    lastHeight = 0;
  }
  const handleScroll = (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // console.log(ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight);
    // console.log(ev.currentTarget.scrollTop);
    const totalHeight =
      ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight;
    const currentHeight = ev.currentTarget.scrollTop;
    const isEnd = rows.length % rowsPerPage;
    if (
      totalHeight === currentHeight &&
      totalHeight > lastHeight &&
      isEnd === 0
    ) {
      // console.log(totalHeight, currentHeight, lastHeight);
      lastHeight = currentHeight;
      searchNextClick();
    }
  };

  // useEffect(() => {
  //   tableRef.current.scrollTop = 0;
  // }, [rows]);
  return (
    <Paper className={classes.root}>
      <TableContainer
        style={{ height: `${maxHeight}px`, overflowY: "auto" }}
        onScroll={handleScroll}
      >
        <Table stickyHeader aria-label="sticky table" ref={tableRef}>
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
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, rowIdx: number) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.key}
                    onClick={() => rowClick(row)}
                    selected={selectedID === row.key}
                  >
                    {columns.map((column: any, colIdx: number) => {
                      let value = row[column.id];
                      if (colIdx === 0) {
                        value = rowIdx + 1;
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.type ? (
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              fullWidth
                              readOnly
                              value={value}
                            >
                              {commonList &&
                                commonList[column.selectList].map(
                                  (row: any) => (
                                    <MenuItem
                                      key={row.key}
                                      value={row[column.selectCdNm[0]]}
                                    >
                                      {row[column.selectCdNm[1]]}
                                    </MenuItem>
                                  )
                                )}
                            </Select>
                          ) : (
                            <div
                              style={{
                                maxWidth: column.maxWidth,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <CardContent>
        <div className={classes.bottom}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.customButton2}
            onClick={nextOnClick}
          >
            {t("Next")}
          </Button>
        </div>
      </CardContent> */}
    </Paper>
  );
}

export default DataList2;
