import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import DonutSmall from "@material-ui/icons/DonutSmall";
import Map from "@material-ui/icons/Map";
import { Link } from "react-router-dom";
export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    {/* <ListItem button component={Link} to="/create">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem> */}
    <ListItem button component={Link} to="/places">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Places" />
    </ListItem>
    <ListItem button component={Link} to="/chart">
      <ListItemIcon>
        <DonutSmall />
      </ListItemIcon>
      <ListItemText primary="Chart" />
    </ListItem>
    <ListItem button component={Link} to="/gallery">
      <ListItemIcon>
        <Map />
      </ListItemIcon>
      <ListItemText primary="Gallery" />
    </ListItem>
  </div>
);
