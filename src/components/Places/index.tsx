import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import PlacesPopup from "./PlacesPopup";
import { searchPlacesRequest, updatePage } from "../../store/placesReducer";
import {
  searchCmmnArrayRequest,
  getCmmnArrayRequest,
} from "../../store/fsCmmnArrayReducer";
import { deleteRequest } from "../../store/cudReducer";
import { DraggableDialog, DataList, CmmnSelect, DataList2 } from "../commons";
import { useTranslation } from "react-i18next";
import ExcelReader from "../Upload/ExcelReader";

interface Column {
  id: "no" | "en_name" | "country_code" | "category" | "address" | "en_descr";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
  type?: "select" | "text";
  selectList?: string;
  selectCdNm?: string[];
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50, align: "center" },
  { id: "en_name", label: "Name", minWidth: 100, maxWidth: 150, align: "left" },
  {
    id: "country_code",
    label: "Country",
    minWidth: 100,
    align: "center",
    type: "select",
    selectList: "country",
    selectCdNm: ["Ctry_Code", "Ctry_Name"],
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    maxWidth: 150,
    align: "left",
    type: "select",
    selectList: "category",
    selectCdNm: ["category_cd", "category_nm"],
  },
  { id: "address", label: "Address", minWidth: 170, maxWidth: 200 },
  { id: "en_descr", label: "Details", minWidth: 170, maxWidth: 200 },
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  top: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottom: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textFiled: {
    // width: "25vw",
    minWidth: "10vw",
    margin: "0 1vw 1vh 0",
  },
  customButton: {
    width: "10vw",
    minWidth: "100px",
    height: "5vh",
  },
  customButton2: {
    width: "10vw",
    minWidth: "100px",
    height: "5vh",
    marginLeft: theme.spacing(1),
  },
  container: {
    maxHeight: 550,
  },
  selected: {},
  progressPosition: {
    display: "absolute",
    top: "50%",
    left: "50%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

/**
 * Status code
 */
const StatusList = () => [
  { key: 0, value: 0, text: "Inactive" },
  { key: 1, value: 1, text: "Active" },
];
let page = 0;
function Places({
  placesList,
  searchPlacesRequest,
  deleteRequest,
  placesStatus,
  cudStatus,
  updatePage,
  searchCmmnArrayRequest,
  getCmmnArrayRequest,
  commonList,
  callLoading,
}: any) {
  const rowsPerPage = 10;
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const handleCountryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(ev.target.value as string);
  };
  const handleStatusChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(ev.target.value as string);
  };
  const handleCategoryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(ev.target.value as string);
  };

  /**
   * loading true or false
   */
  useEffect(() => {
    // console.log(placesStatus, cudStatus);
    if (placesStatus === "WAITING" || cudStatus === "WAITING") {
      callLoading("WAITING");
    } else if (
      placesStatus === "SUCCESS" &&
      (cudStatus === "SUCCESS" || cudStatus === "")
    ) {
      callLoading("SUCCESS");
    }
  }, [placesStatus, cudStatus]);

  /**
   * 공통 collection 조회
   * country, category
   */
  useEffect(() => {
    // const searchCommon = async () => {
    //   await searchCmmnArrayRequest([
    //     { doc: "country", orderBy: "Ctry_Name" },
    //     { doc: "category", orderBy: "category_nm" },
    //   ]);
    // };
    // searchCommon();
    getCmmnArrayRequest();
  }, []);

  const searchParams = (country: any, startPage: number) => {
    const pCategory = category === "All" ? "" : category;
    const pStatus = status === "All" ? "" : status;
    return {
      col: "places",
      where: [
        { country_code: country },
        { category: pCategory },
        { status: pStatus },
      ],
      startPage,
      maxPage: rowsPerPage,
      lastRow: placesList && placesList[placesList.length - 1],
    };
  };

  /**
   * onLoad Search
   * Common Code -> search places
   */
  useEffect(() => {
    const openSearch = async () => {
      setCountry(() => commonList["country"][0].Ctry_Code);
      setCategory("All");
      setStatus("All");
      if (commonList["country"].length > 0) {
        page = 0;
        await searchPlacesRequest(
          searchParams(commonList["country"][0].Ctry_Code, 0)
        );
      }
    };
    commonList && openSearch();
  }, [commonList]);

  // useEffect(() => {
  //   const searchP = async () =>
  //     await searchPlaces(rowsPerPage * page + 1, rowsPerPage);

  //   commonList && country !== "" && searchP();
  // }, [page, rowsPerPage]);

  // const searchPlaces = async (startPage: number, maxPage: number) => {
  //   const params = {
  //     ...searchParams(country),
  //     startPage: startPage,
  //     maxPage: maxPage,
  //   };
  //   await searchPlacesRequest(params);
  // };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleNew = () => {
    setSelectedID(null);
    handleOpen();
  };
  const handleClose = (params: any) => {
    params?.key && updatePage(params);
    setOpen(false);
  };

  const searchClick = () => {
    page = 0;
    return searchPlacesRequest(searchParams(country, 0));
  };

  const searchNextClick = () => {
    page++;
    return searchPlacesRequest(searchParams(country, page));
  };

  /**
   * modify
   */
  const handleModify = () => {
    selectedID && handleOpen();
  };

  /**
   * delete
   */
  const handleDelete = async () => {
    setOpenDialog(false);
    selectedID && (await deleteRequest("places", selectedID));

    await searchPlacesRequest(searchParams(country, 0));
  };

  /**
   * confirm 팝업 open
   */
  const handleClickOpenDialog = () => {
    selectedID && setOpenDialog(true);
  };
  /**
   * confirm 팝업 close
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClose2 = (params: any) => {
    params?.key && updatePage(params);
    setOpen2(false);
  };
  const handleRowClick = (row: any) => {
    // console.log(row);
    setSelectedID(row.key);
  };
  const handleClickOpen = () => {
    setOpen2(true);
  };
  return (
    <>
      <Paper>
        <CardContent>
          <div className={classes.top}>
            <CmmnSelect
              label="Country"
              value={country}
              itemList={commonList && commonList["country"]}
              keyValue={{ key: "Ctry_Code", value: "Ctry_Name" }}
              onChange={handleCountryChange}
            />
            <CmmnSelect
              label="Category"
              value={category || "All"}
              firstItem="All"
              itemList={commonList && commonList["category"]}
              keyValue={{ key: "category_cd", value: "category_nm" }}
              onChange={handleCategoryChange}
            />
            <CmmnSelect
              label="Status"
              value={status || "All"}
              firstItem="All"
              itemList={StatusList()}
              keyValue={{ key: "value", value: "text" }}
              onChange={handleStatusChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.customButton}
              onClick={searchClick}
            >
              {t("Search")}
            </Button>
          </div>
        </CardContent>
        <DataList2
          columns={columns.map((column) => ({
            ...column,
            label: t(column.label),
          }))}
          rows={placesList || []}
          rowClick={handleRowClick}
          selectedID={selectedID}
          maxHeight={"570"}
          page={page}
          rowsPerPage={rowsPerPage}
          commonList={commonList}
          searchNextClick={searchNextClick}
        />
        {/* <DataList
          columns={columns.map((column) => ({
            ...column,
            label: t(column.label),
          }))}
          rows={(placesStatus === "SUCCESS" && placesList) || []}
          rowClick={handleRowClick}
          selectedID={selectedID}
          maxHeight={"520"}
          search={searchPlaces}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          commonList={commonList}
        /> */}
        <CardContent>
          <div className={classes.bottom}>
            <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleNew}
            >
              {t("New")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleModify}
            >
              {t("Modify")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleClickOpenDialog}
            >
              {t("Delete")}
            </Button>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className={classes.customButton2}
              >
                {t("Upload")}
              </Button>
              <Dialog
                open={open2}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Upload excel file only.{" "}
                </DialogTitle>
                <DialogContent>
                  <div>
                    <ExcelReader />
                  </div>
                </DialogContent>
                <DialogActions>
                  {/* <Button 
                    variant="contained" 
                    type="submit" 
                    color="primary"
                    className={classes.customButton2}
                    value="Process Triggers"
                  >
                    {t("Save")}  
                  </Button> */}
                  <Button
                    variant="contained"
                    onClick={handleClose2}
                    color="secondary"
                    style={{ width: 105, margin: 14 }}
                    className={classes.customButton2}
                  >
                    {t("Cancel")}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* <div>
              <ExcelReader/>
            </div> */}
          </div>
        </CardContent>
      </Paper>

      <PlacesPopup
        open={open}
        handleClose={handleClose}
        selectedID={selectedID}
      />
      <DraggableDialog
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        handleYesDialog={handleDelete}
        alertTitle={"Delete"}
        alertMsg={"Delete?"}
      />
    </>
  );
}

function mapStateToProps(state: any) {
  // console.log(state.fsCmmnArrayReducer);
  const commonList =
    state.fsCmmnArrayReducer.status === "SUCCESS"
      ? state.fsCmmnArrayReducer.rowData
      : null;
  return {
    placesList: state.placesReducer?.rowData,
    placesStatus: state.placesReducer?.status,
    cudStatus: state.cudReducer?.status,
    commonList,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    searchPlacesRequest: (param: any) => dispatch(searchPlacesRequest(param)),
    updatePage: (param: any) => dispatch(updatePage(param)),
    searchCmmnArrayRequest: (param: any) =>
      dispatch(searchCmmnArrayRequest(param)),
    getCmmnArrayRequest: () => dispatch(getCmmnArrayRequest()),
    deleteRequest: (col: string, doc: string) =>
      dispatch(deleteRequest(col, doc)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Places);
