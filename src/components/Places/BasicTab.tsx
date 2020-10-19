import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import {
  CmmnSelect,
  CommonPopup,
  MapContainer2,
  OpeningHours,
} from "../commons";
import SingleLineGridList from "../commons/SingleLineGridImg";
import { AttachmentType } from "./PlacesPopup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxHeight: 220,
    },
    customButton2: {
      width: "8vw",
      minWidth: "80px",
      height: "3.5vh",
      marginLeft: theme.spacing(1),
    },
    gridCustom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

interface BasicTabProps {
  commonList: any;
  country: string;
  category: number | string;
  address: string;
  latitude: string;
  longitude: string;
  currency: string;
  attachment: AttachmentType[] | null;
  opening_hours: string[];
  handleCountryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
  handleCategoryChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onLatLngChang: (latLng: any, address: string) => void;
  handleClearMap: () => void;
  addImg: (newImg: AttachmentType[]) => void;
  deleteImg: (args: any) => void;
}

function BasicTab({
  commonList,
  country,
  category,
  address,
  latitude,
  longitude,
  currency,
  attachment,
  opening_hours,
  handleCountryChange,
  handleCategoryChange,
  onChange,
  onLatLngChang,
  handleClearMap,
  addImg,
  deleteImg,
}: BasicTabProps) {
  const classes = useStyles();
  const [latLng, setLatLng] = useState<any>({ lat: "", lng: "" });
  const [openMap, setOpenMap] = useState(false);
  const fileRef = useRef<any>();

  const onSelectCountryChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    handleCountryChange(ev);
  };

  const onSelectCategoryChange = (
    ev: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleCategoryChange(ev);
  };

  const onTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev);
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

  /**
   * map 팝업 open
   */
  const handleOpenMap = () => {
    if (latitude && longitude) {
      setOpenMapDefault();
    } else if (!country || country === "Select") {
      alert("first select country");
    } else {
      setOpenMapDefault();
    }
  };

  const onClearButtonClick = () => {
    handleClearMap();
  };

  /**
   * map 팝업 close
   */
  const handleCloseMap = (params: any) => {
    // params.key && updatePage(params);
    setOpenMap(false);
  };

  const onLatLngChang2 = (latLng: any, address: string) => {
    // console.log(latLng);
    // setInputs((prevState) => ({
    //   ...prevState,
    //   latitude: latLng.lat,
    //   longitude: latLng.lng,
    //   address,
    // }));
    onLatLngChang(latLng, address);
    setOpenMap(false);
  };

  /**
   * 파일 추가 버튼
   * @desc input file 버튼 실행
   */
  const handleAddFile = () => {
    fileRef.current.click();
  };

  /**
   * 파일 추가 input  hidden
   */
  const handleAttachFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    const { files } = target;
    if (files) {
      Array.prototype.forEach.call(files, (file: File) => {
        const ext = file.type.split("/")[1];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
          const currentTarget = finishedEvent.currentTarget as FileReader;
          const { result } = currentTarget;
          result && addImg([{ img: result.toString(), ext, isNew: true }]);
        };
        if (Boolean(file)) {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.gridCustom}>
            <CmmnSelect
              label="Country"
              value={country || "Select"}
              firstItem="Select"
              itemList={commonList && commonList["country"]}
              keyValue={{ key: "Ctry_Code", value: "Ctry_Name" }}
              onChange={onSelectCountryChange}
            />
            <TextField
              name="currency"
              label="currency"
              fullWidth
              value={currency}
              disabled
            />
            <CmmnSelect
              label="Category"
              value={category || "Select"}
              firstItem="Select"
              itemList={commonList && commonList["category"]}
              keyValue={{ key: "category_cd", value: "category_nm" }}
              onChange={onSelectCategoryChange}
            />
          </Grid>

          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            value={address}
            onChange={onTextChange}
          />
          <Grid item xs={12} className={classes.gridCustom}>
            <TextField
              disabled
              id="latitude"
              name="latitude"
              label="Latitude"
              fullWidth
              value={latitude}
              onChange={onTextChange}
            />
            <TextField
              disabled
              id="longitude"
              name="longitude"
              label="Longitude"
              fullWidth
              value={longitude}
              onChange={onTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.customButton2}
              onClick={handleOpenMap}
            >
              Spot
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.customButton2}
              onClick={onClearButtonClick}
            >
              Clear
            </Button>
          </Grid>
          <OpeningHours opening_hours={opening_hours} />
          <Grid item xs={12} className={classes.gridCustom}>
            <Button variant="contained" color="primary" onClick={handleAddFile}>
              Image
            </Button>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAttachFile}
              ref={fileRef}
            />
          </Grid>
          {
            attachment && (
              <SingleLineGridList imgList={attachment} deleteImg={deleteImg} />
            )
            // attachment.map((img) => (
            //   <div key={img.img}>
            //     <img src={img.img} style={{ width: 100, height: 100 }} />
            //   </div>
            // ))
          }
        </Grid>
      </Grid>
      <CommonPopup
        width={"460px"}
        height={"650px"}
        open={openMap}
        handleClose={handleCloseMap}
      >
        <MapContainer2
          width={"460px"}
          height={"450px"}
          latitude={latitude}
          longitude={longitude}
          defaultLatLng={latLng}
          onLatLngChang={onLatLngChang2}
        />
      </CommonPopup>
    </>
  );
}

export default BasicTab;
