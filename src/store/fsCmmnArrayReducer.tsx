import { FQcommonArray } from "../fQuery";
import getCmmnData from "./cmmnArrayData";

const CMMN_ARRAY_LOADING = "CMMN_ARRAY_LOADING" as const;
const CMMN_ARRAY_SEARCH = "CMMN_ARRAY_SEARCH" as const;
const CMMN_ARRAY_GET = "CMMN_ARRAY_GET" as const;
const CMMN_ARRAY_FAILED = "CMMN_ARRAY_FAILED" as const;

const loadingCmmnArrayAction = () => ({
  type: CMMN_ARRAY_LOADING,
  payload: "",
});

const searchCmmArrayAction = (data: any) => ({
  type: CMMN_ARRAY_SEARCH,
  payload: data,
});

const getCmmArrayAction = (data: any) => ({
  type: CMMN_ARRAY_GET,
  payload: data,
});

const failedCmmArrayAction = () => ({
  type: CMMN_ARRAY_FAILED,
  payload: "",
});

export type actionType =
  | ReturnType<typeof loadingCmmnArrayAction>
  | ReturnType<typeof searchCmmArrayAction>
  | ReturnType<typeof getCmmArrayAction>
  | ReturnType<typeof failedCmmArrayAction>;

// search action
export const searchCmmnArrayRequest = (params: any) => {
  return async (dispatch: any) => {
    dispatch(loadingCmmnArrayAction());
    try {
      const result = await FQcommonArray(params);
      dispatch(searchCmmArrayAction(result));
    } catch (e) {
      dispatch(failedCmmArrayAction());
    }
  };
};

// get common data
export const getCmmnArrayRequest = () => {
  return (dispatch: any) => {
    dispatch(getCmmArrayAction(getCmmnData()));
  };
};

export interface StateProps {
  status: string;
  rowData?: any;
}

const initState: StateProps = {
  status: "",
  rowData: null,
};

// reducer
const fsCmmnArrayReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case CMMN_ARRAY_LOADING:
      return { status: "WAITING" };
    case CMMN_ARRAY_SEARCH:
    case CMMN_ARRAY_GET:
      return {
        status: "SUCCESS",
        rowData: action.payload,
      };
    case CMMN_ARRAY_FAILED:
      return {
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default fsCmmnArrayReducer;
