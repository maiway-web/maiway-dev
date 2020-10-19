import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function DataList({
  columns,
  rows,
  rowClick,
  selectedID,
  maxHeight,
  search,
  isFresh,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  commonList,
}: any) {
  const classes = useStyles();

  // useEffect(() => {
  //   console.log("dfdfdf");
  //   // if (page > 0) {
  //   const searchT = async () =>
  //     await search(rowsPerPage * page + 1, rowsPerPage);

  //   searchT();
  //   // }
  // }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer style={{ maxHeight: maxHeight }}>
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
                        value = page * rowsPerPage + rowIdx + 1;
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows[0]?.totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataList;
