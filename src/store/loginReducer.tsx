const IS_LOGGENIN = "IS_LOGGENID" as const;

interface initProps {
  displayName: string | null;
  uid: string | null;
  photoURL: string | null;
  updateProfile: any;
}

export type loginProps = initProps;

const isLoginnendAction = (data: loginProps) => ({
  type: IS_LOGGENIN,
  payload: data,
});

type actionType = ReturnType<typeof isLoginnendAction>;
// action
export const setLoginUserObj = (data: loginProps) => {
  return isLoginnendAction(data);
};

const initState: loginProps = {
  displayName: null,
  uid: null,
  photoURL: null,
  updateProfile: null,
};
// reducer
const loginReducer = (state = initState, action: actionType) => {
  switch (action.type) {
    case IS_LOGGENIN:
      return action.payload;

    default:
      return state;
  }
};

export default loginReducer;
