import { FQdelete, FQsave, FQupdate } from "../fQuery";

const LOADING = "LOADING";
const SAVE = "SAVE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const FAIL = "FAIL";

// action type
const loadingAction = () => ({
  type: LOADING,
});

const saveAction = () => ({
  type: SAVE,
});
const updateAction = () => ({
  type: UPDATE,
});
const deleteAction = () => ({
  type: DELETE,
});
const failAction = () => ({
  type: FAIL,
});

type actionType =
  | ReturnType<typeof loadingAction>
  | ReturnType<typeof saveAction>
  | ReturnType<typeof updateAction>
  | ReturnType<typeof deleteAction>
  | ReturnType<typeof failAction>;

// action
export const saveRequest = (col: string, params: {}) => {
  return async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      // await axios.post("/api/fstore/save", { col, params });
      await FQsave({ col, params });
      // console.log("abc", result.data);
      dispatch(saveAction());
    } catch (e) {
      dispatch(failAction());
    }
  };
};

// action
export const updateRequest = (col: string, doc: string, params: {}) => {
  return async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      // await axios.post("/api/fstore/update", { col, doc, params });
      await FQupdate({ col, doc, params });
      // console.log("abc", result.data);
      dispatch(updateAction());
    } catch (e) {
      dispatch(failAction());
    }
  };
};

// action
export const deleteRequest = (col: string, doc: string) => {
  return async (dispatch: any) => {
    dispatch(loadingAction());
    try {
      await FQdelete({ col, doc });
      dispatch(deleteAction());
    } catch (e) {
      dispatch(failAction());
    }
  };
};

interface StateProps {
  status: string;
  statusText?: string;
  currentUser?: string;
}

const initState: StateProps = {
  status: "",
};
// reducer
const cudReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case LOADING:
      return { ...state, status: "WAITING" };
    case SAVE:
      return {
        ...state,
        status: "SUCCESS",
      };
    case UPDATE:
      return {
        ...state,
        status: "SUCCESS",
      };
    case DELETE:
      return {
        ...state,
        status: "SUCCESS",
      };
    case FAIL:
      return {
        ...state,
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default cudReducer;
