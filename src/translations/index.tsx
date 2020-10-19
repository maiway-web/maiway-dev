import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./translation.en.json";
import translationKr from "./translation.kr.json";
import translationFr from "./translation.fr.json";
import translationCn from "./translation.cn.json";
import translationTc from "./translation.tc.json";
import translationJp from "./translation.jp.json";
import translationPh from "./translation.ph.json";
import { getLanguage } from "../store/languageReducer";

const resource = {
  EN: {
    translation: translationEn,
  },
  KR: {
    translation: translationKr,
  },
  FR: {
    translation: translationFr,
  },
  CN: {
    translation: translationCn,
  },
  TC: {
    translation: translationTc,
  },
  JP: {
    translation: translationJp,
  },
  PH: {
    translation: translationPh,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: getLanguage(),
  fallbackLng: "EN",
  debug: false,
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
