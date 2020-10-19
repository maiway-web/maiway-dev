import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  Box,
  List,
  Divider,
  IconButton,
  Container,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import HeaderBar from "../components/Header";
import { mainListItems } from "../components/SideBar";
import { rootState } from "../store";
import { Copyright } from "../components/commons";
import Dashboard from "../components/Dashboard";
import { loginProps } from "../store/loginReducer";
import Gallery from "../components/Gallery";
import Chart from "../components/Chart";
import Places from "../components/Places";
import Create from "../components/Create";
import Settings from "../components/Settings";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

interface HomeProps {
  userObj: loginProps;
  callLoading: () => void;
}
function Home({ userObj, callLoading }: HomeProps) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const {
    location: { pathname },
  } = history;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        userObj={userObj}
      />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {pathname === "/" && <Dashboard />}
          {pathname === "/create" && <Create />}
          {pathname === "/places" && <Places callLoading={callLoading} />}
          {pathname === "/chart" && <Chart />}
          {pathname === "/gallery" && <Gallery />}
          {pathname === "/settings" && <Settings />}

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

export default connect(mapStateToProps)(Home);
