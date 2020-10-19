import axios from "axios";

const MAIWAY_LANGUAGE = "maiwayLanguage";

const SEARCH_LANGUAGE = "SEARCH_LANGUAGE" as const;
const UPDATE_LANGUAGE = "UPDATE_LANGUAGE" as const;

// action type
const searchLangAction = (language: string) => ({
  type: SEARCH_LANGUAGE,
  payload: language,
});
const updateLangAction = (language: string) => ({
  type: UPDATE_LANGUAGE,
  payload: language,
});

type actionType =
  | ReturnType<typeof searchLangAction>
  | ReturnType<typeof updateLangAction>;

export const getLanguage = () => {
  const localLanguage = window.localStorage.getItem(MAIWAY_LANGUAGE) || "EN";
  return localLanguage;
};

const updateLanguage = (language: string) => {
  window.localStorage.setItem(MAIWAY_LANGUAGE, language);
  return language;
};

// action
export const searchLangRequest = () => {
  return async (dispatch: any) => {
    try {
      const localLanguage = getLanguage();
      dispatch(searchLangAction(localLanguage));
    } catch (err) {
      console.log(err);
    }
  };
};

// action
export const updateLangRequest = (language: string) => {
  return async (dispatch: any) => {
    try {
      const changeLanguage = updateLanguage(language);
      // console.log("abc", result.data);
      dispatch(updateLangAction(changeLanguage));
    } catch (err) {
      console.log(err);
    }
  };
};

interface StateProps {
  language: string;
}

const initState: StateProps = {
  language: getLanguage(),
};
// reducer
const languageReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case SEARCH_LANGUAGE:
      return {
        language: action.payload,
      };
    case UPDATE_LANGUAGE:
      return {
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
