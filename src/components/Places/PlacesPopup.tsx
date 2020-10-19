import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  CardContent,
  Typography,
  Paper,
  Tabs,
  CssBaseline,
  Tab,
  Box,
} from "@material-ui/core";

import { saveRequest, updateRequest } from "../../store/cudReducer";
import { updatePage } from "../../store/placesReducer";
import { DraggableDialog, CmmnTabPanel, LoadingIndicator } from "../commons";
import {
  deleteImageToStorage,
  downloadImageToStorage,
  FQGeoPoint,
  FQtimestampNow,
  uploadImageToStorage,
} from "../../fQuery";
import { rootState } from "../../store";
import { useTranslation } from "react-i18next";
import BasicTab from "./BasicTab";
import CountryTab from "./CountryTab";

const useStyles = makeStyles((theme: Theme) => ({
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
    width: 1024,
    maxHeight: 800,
    height: 768,
    overflow: "auto",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  customButton2: {
    width: "8vw",
    minWidth: "80px",
    height: "3.5vh",
    marginLeft: theme.spacing(1),
  },
  bottom: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export interface AttachmentType {
  img: string;
  ext?: string;
  isNew?: boolean;
  orgImg?: string;
}

function PlacesPopup({
  open,
  handleClose,
  fnSave,
  fnUpdate,
  selectedRow,
  commonList,
  updatePage,
  cudStatus,
}: any) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [attachment, setAttachment] = useState<AttachmentType[] | null>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [inputs, setInputs] = useState({
    address: "",
    latitude: "",
    longitude: "",
    currency: "",
    en_name: "",
    fr_name: "",
    jp_name: "",
    kr_name: "",
    ph_name: "",
    cn_name: "",
    tc_name: "",
    en_descr: "",
    fr_descr: "",
    jp_descr: "",
    kr_descr: "",
    ph_descr: "",
    cn_descr: "",
    tc_descr: "",
    photos: [],
    opening_hours: [""],
  });

  const [openMap, setOpenMap] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    address,
    latitude,
    longitude,
    currency,
    en_name,
    fr_name,
    jp_name,
    kr_name,
    ph_name,
    cn_name,
    tc_name,
    en_descr,
    fr_descr,
    jp_descr,
    kr_descr,
    ph_descr,
    cn_descr,
    tc_descr,
    photos,
    opening_hours,
  } = inputs;

  const [country, setCountry] = useState("Select");
  const [category, setCategory] = useState<string | number>("Select");
  const [alertMsg, setAlertMsg] = useState("New");
  const [latLng, setLatLng] = useState<any>({ lat: "", lng: "" });
  useEffect(() => {
    if (open && selectedRow) {
      setAlertMsg("Update");
      setInputs({
        address: selectedRow.address || "",
        latitude: selectedRow.geo?.latitude || 0,
        longitude: selectedRow.geo?.longitude || 0,
        currency: selectedRow.currency || "",
        en_name: selectedRow.en_name || "",
        fr_name: selectedRow.fr_name || "",
        jp_name: selectedRow.jp_name || "",
        kr_name: selectedRow.kr_name || "",
        ph_name: selectedRow.ph_name || "",
        cn_name: selectedRow.cn_name || "",
        tc_name: selectedRow.tc_name || "",
        en_descr: selectedRow.en_descr || "",
        fr_descr: selectedRow.fr_descr || "",
        jp_descr: selectedRow.jp_descr || "",
        kr_descr: selectedRow.kr_descr || "",
        ph_descr: selectedRow.ph_descr || "",
        cn_descr: selectedRow.cn_descr || "",
        tc_descr: selectedRow.tc_descr || "",
        photos: selectedRow.photos || [],
        opening_hours: selectedRow.opening_hours || [""],
        // opening_hours: [
        //   "Monday (10:00AM - 5:00PM), Tuesday (10:00AM - 5:00PM), Saturday (10:00AM - 5:00PM)",
        // ],
      });
      setCountry(selectedRow.country_code || "Select");
      setCategory(selectedRow.category || "Select");
      if (selectedRow.photos) {
        getImgUrl(selectedRow.photos);
        // getImgUrl([
        //   "places/1ktCJus1GqD9GwNdFkEZ/1ktCJus1GqD9GwNdFkEZ_01.jpg",
        //   "places/1ktCJus1GqD9GwNdFkEZ/1ktCJus1GqD9GwNdFkEZ_01.jpg",
        // ]);
      }
    }
    return () => {
      setInputs({
        address: "",
        latitude: "",
        longitude: "",
        currency: "",
        en_name: "",
        fr_name: "",
        jp_name: "",
        kr_name: "",
        ph_name: "",
        cn_name: "",
        tc_name: "",
        en_descr: "",
        fr_descr: "",
        jp_descr: "",
        kr_descr: "",
        ph_descr: "",
        cn_descr: "",
        tc_descr: "",
        photos: [],
        opening_hours: [""],
      });
      setCountry("Select");
      setCategory("Select");
      setAttachment(null);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  /**
   * get images url
   */
  const getImgUrl = async (photos: string[]) => {
    const arrImg = await downloadImageToStorage(photos);
    setAttachment(arrImg);
  };

  /**
   * add images
   */
  const addImg = (newImg: AttachmentType[]) => {
    setAttachment((prev) => {
      if (prev) {
        return [...prev, ...newImg];
      }
      return newImg;
    });
  };

  /**
   * delete images
   */
  const deleteImg = async (args: any) => {
    // console.log(args);
    // console.log(selectedRow.photos);
    if (args.isNew) {
      // 1. update attachment
      setAttachment((prev) => {
        if (prev) {
          return prev.filter((prev) => prev.img !== args.img);
        }
        return [];
      });
    } else {
      // 1. delete storage
      await deleteImageToStorage(args.img);
      const doc = selectedRow.key;
      const filterImgs = selectedRow.photos.filter(
        (img: string) => img !== args.orgImg
      );
      const params = { key: selectedRow.key, photos: filterImgs };
      // 2. delete firstore
      await fnUpdate("places", doc, params);
      // 3. update placesReducer
      updatePage(params);

      // 4. update attachment
      setAttachment((prev) => {
        if (prev) {
          return prev.filter((prev) => prev.orgImg !== args.orgImg);
        }
        return [];
      });
      setInputs((prev) => ({
        ...prev,
        photos: prev.photos.filter((img) => img !== args.orgImg),
      }));
    }
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCountryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(ev.target.value as string);

    const selCountry = commonList["country"].filter(
      (ctry: any) => ctry.Ctry_Code === ev.target.value
    );

    const currency = selCountry[0]?.Ctry_Currency;
    setInputs({ ...inputs, currency });
  };
  const handleCategoryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(ev.target.value as number);
  };

  /**
   * save or update
   */
  const handleSave = async (arrImgUrl?: string[]) => {
    const selCountry = commonList["country"].filter(
      (ctry: any) => ctry.Ctry_Code === country
    );

    // const currency = selCountry[0]?.Ctry_Currency;
    // console.log(photos);
    // console.log(arrImgUrl);
    const arrImg = (arrImgUrl && [...photos, ...arrImgUrl]) || [...photos];
    const params = {
      address,
      geo: FQGeoPoint(latitude, longitude),
      en_name,
      fr_name,
      jp_name,
      kr_name,
      ph_name,
      cn_name,
      tc_name,
      en_descr,
      fr_descr,
      jp_descr,
      kr_descr,
      ph_descr,
      cn_descr,
      tc_descr,
      country_code: country,
      currency,
      category,
      photos: arrImg,
      opening_hours,
      update_at: FQtimestampNow(),
    };
    if (!selectedRow) {
      // 신규
      const newParams = {
        business_status: true,
        created_at: FQtimestampNow(),
        creator: "",
        formatted_phone_number: "",
        guide_id: "",
        is_featured: true,
        locality: "",
        modifier: "",
        opening_hours: [],
        photos: arrImg,
        price1: 0,
        price2: 0,
        rating: 0,
        status: 1,
        update_at: FQtimestampNow(),
        use_yn: "",
        user_ratings_total: 0,
        website: "",
      };
      await fnSave("places", { ...params, ...newParams });
      handleClose();
    } else {
      // 업데이트
      // const obj2 = { ...obj, doc: selectedRow.key };
      const doc = selectedRow.key;
      await fnUpdate("places", doc, params);
      handleClose({ ...selectedRow, ...params });
    }
  };

  const validationCheck = () => {
    if (country === "Select") {
      alert(t("Please select a country"));
      return false;
    } else if (category === "Select") {
      alert(t("Please select a category"));
      return false;
    }
    return true;
  };
  /**
   * confirm 팝업 open
   */
  const handleClickOpenDialog = () => {
    if (!validationCheck()) {
      return false;
    }
    setOpenDialog(true);
  };
  /**
   * confirm 팝업 close
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /**
   * image upload
   */
  const uploadImages = async () => {
    const uploadImages = attachment?.filter((img) => img.isNew);

    if (uploadImages && uploadImages.length > 0) {
      const uploadedImgs = await uploadImageToStorage(uploadImages);
      return uploadedImgs;
    }
  };

  /**
   * insert or update
   */
  const handleUpdate = async () => {
    setOpenDialog(false);
    const arrImgUrl = await uploadImages();
    await handleSave(arrImgUrl);
    // console.log("updte");
  };

  /**
   * map 팝업 close
   */
  const handleCloseMap = (params: any) => {
    // params.key && updatePage(params);
    setOpenMap(false);
  };

  const onLatLngChang = (latLng: any, address: any) => {
    // console.log(latLng);
    setInputs((prevState) => ({
      ...prevState,
      latitude: latLng.lat,
      longitude: latLng.lng,
      address,
    }));
    // setOpenMap(false);
  };

  const setOpenMapDefault = () => {
    const selCountry = commonList["country"].filter(
      (ctry: any) => ctry.Ctry_Code === country
    );

    const arrLatLng = selCountry[0].Ctry_Latlng.split(",");

    arrLatLng &&
      setLatLng({
        lat: parseFloat(arrLatLng[0]),
        lng: parseFloat(arrLatLng[1]),
      });
    arrLatLng && setOpenMap(true);
  };

  const handleClearMap = () => {
    setInputs((prevState) => ({ ...prevState, latitude: "", longitude: "" }));
  };

  const arrCountryTabs = [
    { name: "en", value: en_name, descr: en_descr },
    { name: "kr", value: kr_name, descr: kr_descr },
    { name: "ph", value: ph_name, descr: ph_descr },
    { name: "fr", value: fr_name, descr: fr_descr },
    { name: "jp", value: jp_name, descr: jp_descr },
    { name: "cn", value: cn_name, descr: cn_descr },
    { name: "tc", value: tc_name, descr: tc_descr },
  ] as const;
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
          <div className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              New / Modify
            </Typography>
            <Paper className={classes.root}>
              <Tabs
                aria-label="simple tabs example"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {["BASIC", "EN", "KR", "PH", "FR", "JP", "CN", "TC"].map(
                  (label) => (
                    <Tab
                      key={label}
                      label={t(label)}
                      style={{ minWidth: 100 }}
                    />
                  )
                )}
              </Tabs>
              <CssBaseline />
              <CmmnTabPanel value={value} index={0}>
                <BasicTab
                  commonList={commonList}
                  country={country}
                  category={category}
                  address={address}
                  latitude={latitude}
                  longitude={longitude}
                  currency={currency}
                  attachment={attachment}
                  opening_hours={opening_hours}
                  handleCountryChange={handleCountryChange}
                  handleCategoryChange={handleCategoryChange}
                  onChange={onChange}
                  onLatLngChang={onLatLngChang}
                  handleClearMap={handleClearMap}
                  addImg={addImg}
                  deleteImg={deleteImg}
                />
              </CmmnTabPanel>
              {arrCountryTabs.map((ctry, idx) => (
                <CmmnTabPanel key={idx} value={value} index={idx + 1}>
                  <CountryTab
                    value={ctry.value}
                    descr={ctry.descr}
                    name={ctry.name}
                    onChange={onChange}
                  />
                </CmmnTabPanel>
              ))}
            </Paper>
            <CardContent>
              <div className={classes.bottom}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.customButton2}
                  onClick={handleClickOpenDialog}
                >
                  Save
                </Button>
              </div>
            </CardContent>
            {cudStatus === "WAITING" && <LoadingIndicator />}
          </div>
        </Fade>
      </Modal>
      <DraggableDialog
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        handleYesDialog={handleUpdate}
        alertTitle={alertMsg}
        alertMsg={`${alertMsg}?`}
      />
    </>
  );
}

function mapStateToProps(state: rootState, ownProps: any) {
  let selectedRow = [];
  if (state.placesReducer) {
    const { rowData } = state.placesReducer;
    selectedRow = rowData?.filter(
      (row: any) => row.key === ownProps.selectedID
    )[0];
  }
  return {
    selectedRow: selectedRow,
    commonList: state.fsCmmnArrayReducer.rowData,
    cudStatus: state.cudReducer.status,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fnSave: (col: string, params: any) => dispatch(saveRequest(col, params)),
    fnUpdate: (col: string, doc: string, params: any) =>
      dispatch(updateRequest(col, doc, params)),
    updatePage: (param: any) => dispatch(updatePage(param)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPopup);
