import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
// import Navigation from "../components/Navigation";
import { loginProps } from "../store/loginReducer";
// import Profile from "../routes/Profile";
import { connect } from "react-redux";
import { rootState } from "../store";

interface AppRouterProps {
  userObj: loginProps;
  refreshUser: () => void;
  callLoading: () => void;
}
const AppRouter = ({ userObj, refreshUser, callLoading }: AppRouterProps) => {
  return (
    <Router>
      {/* {userObj.uid && <Navigation />} */}
      <Switch>
        {userObj.uid ? (
          <>
            <Route exact path="/">
              <Home callLoading={callLoading} />
            </Route>
            <Route exact path="/create">
              <Home callLoading={callLoading} />
            </Route>
            <Route exact path="/places">
              <Home callLoading={callLoading} />
            </Route>
            <Route exact path="/chart">
              <Home callLoading={callLoading} />
            </Route>
            <Route exact path="/gallery">
              <Home callLoading={callLoading} />
            </Route>
            <Route exact path="/settings">
              <Home callLoading={callLoading} />
            </Route>
            {/* <Route path="/:id">
              <Home callLoading={callLoading} />
            </Route> */}

            {/* <Route exact path="/profile">
              <Profile refreshUser={refreshUser} />
            </Route> */}
          </>
        ) : (
          <Route exact path="/">
            <Login callLoading={callLoading} />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

export default connect(mapStateToProps)(AppRouter);
