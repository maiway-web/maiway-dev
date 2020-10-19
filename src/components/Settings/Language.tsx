import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputLabel,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Title, DraggableDialog } from "../commons";
import { connect } from "react-redux";
import { updateLangRequest } from "../../store/languageReducer";
import { rootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
      },
    },
    paper: {
      padding: theme.spacing(2),
      width: "100%",
    },
    inputLabel: {
      display: "inline-block",
      marginLeft: theme.spacing(3),
    },
    typoBody: {
      marginTop: theme.spacing(3),
    },
    buttonRoot: {
      "& > *": {
        margin: theme.spacing(1),
      },
      display: "flex",
      justifyContent: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
  })
);

interface languageProps {
  idx: number;
  lang_cd: "EN" | "FR" | "CN" | "TC" | "JP" | "KR" | "PH";
  lang_nm: string;
}
const arrLanguage: languageProps[] = [
  { idx: 0, lang_cd: "EN", lang_nm: "ENGLISH" },
  { idx: 1, lang_cd: "FR", lang_nm: "FRENCH" },
  { idx: 2, lang_cd: "CN", lang_nm: "CHINESE SIMPLIFIED" },
  { idx: 3, lang_cd: "TC", lang_nm: "CHINESE TRADITIONAL" },
  { idx: 4, lang_cd: "JP", lang_nm: "JAPANESE" },
  { idx: 5, lang_cd: "KR", lang_nm: "KOREAN" },
  { idx: 6, lang_cd: "PH", lang_nm: "PHILIPPINES/TAGALOG" },
];

function Language({ updateLangRequest, localLanguage }: any) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setLanguage(localLanguage.language);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localLanguage.language);
  }, [localLanguage]);

  /**
   * selectBox change language
   */
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  /**
   * save language
   */
  const handleSaveLanguage = async () => {
    handleCloseDialog();
    updateLangRequest(language);
  };

  /**
   * confirm 팝업 open
   */
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  /**
   * confirm 팝업 close
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // console.log(i18n.language);
  return (
    <>
      <div className={classes.root}>
        <Title>Change language</Title>
        <Paper elevation={3} className={classes.paper}>
          <Typography component={"span"}>
            In use: {t(`${localLanguage.language}`)}
          </Typography>
          <InputLabel className={classes.inputLabel}>
            {/* {cookies["maiway-language"]} */}
          </InputLabel>

          <Typography className={classes.typoBody} variant="h6">
            Currently, the language is {t(`${localLanguage.language}`)}. if you
            wish to change the language, choose a language in dropdown and click
            Confirm.
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={language}
              onChange={handleChange}
              label="language"
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {arrLanguage.map((lang: languageProps) => (
                <MenuItem key={lang.idx} value={lang.lang_cd}>
                  {lang.lang_nm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </div>
      <div className={classes.buttonRoot}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpenDialog}
        >
          Confirm
        </Button>
        <DraggableDialog
          handleCloseDialog={handleCloseDialog}
          openDialog={openDialog}
          handleYesDialog={handleSaveLanguage}
          alertTitle={"Change language"}
          alertMsg={t("change language?")}
        />
      </div>
    </>
  );
}

function mapStateToProps(state: rootState) {
  return {
    localLanguage: state.languageReducer,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    updateLangRequest: (language: string) =>
      dispatch(updateLangRequest(language)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Language);
