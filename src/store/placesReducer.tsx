import { FQsearchpage } from "../fQuery";

const LOADING_PLACES = "LOADING_PLACES";
const SEARCH_PLACES = "SEARCH_PLACES";
const UPDATE_PLACES = "UPDATE_PLACES";
const FAIL_PLACES = "FAIL_PLACES";

// const queryAction = <T extends {}>(data: T) => ({
//   type: QUERY,
//   payload: data,
// });
// action type
const loadingPlacesAction = (startPage: number) => ({
  type: LOADING_PLACES,
  payload: startPage,
});

const searchPlacesAction = (data: any) => ({
  type: SEARCH_PLACES,
  payload: data,
});
const updatePlacesAction = (data: any) => ({
  type: UPDATE_PLACES,
  payload: data,
});

const failPlacesAction = () => ({
  type: FAIL_PLACES,
  payload: "",
});

export type actionType =
  | ReturnType<typeof loadingPlacesAction>
  | ReturnType<typeof searchPlacesAction>
  | ReturnType<typeof updatePlacesAction>
  | ReturnType<typeof failPlacesAction>;

// search action
export const searchPlacesRequest = (params: any) => {
  return async (dispatch: any) => {
    dispatch(loadingPlacesAction(params.startPage));
    try {
      // const result = await axios.get("/api/fstore/searchpage", {
      //   params,
      // });
      const result = await FQsearchpage(params);
      dispatch(searchPlacesAction(result));
    } catch (e) {
      dispatch(failPlacesAction());
    }
  };
};

export const updatePage = (params: any) => {
  return (dispatch: any) => {
    dispatch(updatePlacesAction(params));
  };
};

export interface StateProps {
  status: string;
  rowData?: any;
  comRowData?: any;
}

const initState: StateProps = {
  status: "",
  rowData: null,
  comRowData: null,
};

// reducer
const placesReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case LOADING_PLACES:
      return {
        status: "WAITING",
        rowData: action.payload === 0 ? null : state.rowData,
      };
    case SEARCH_PLACES:
      return {
        status: "SUCCESS",
        rowData:
          (state.rowData && [...state.rowData, ...action.payload]) ||
          action.payload,
      };
    case UPDATE_PLACES:
      return {
        status: "SUCCESS",
        rowData: state.rowData?.map((row: any) => {
          let newRow = {};
          if (row.key === action.payload.key) {
            // console.log("row.key");
            newRow = { ...row, ...action.payload };
          } else {
            newRow = { ...row };
          }
          return newRow;
        }),
      };
    case FAIL_PLACES:
      return {
        status: "FAILURE",
      };
    default:
      return state;
  }
};

export default placesReducer;
