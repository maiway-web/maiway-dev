import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { LocationOn } from "@material-ui/icons";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
function DashboardList() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Typography color="textPrimary" align="center">
        Place
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Published" />
        <Tab label="Unpublished" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemText primary="1000 Roses Cardova, Cebu 1000visits" />
            <ListItemAvatar>
              <LocationOn className={classes.iconFontsize} />
            </ListItemAvatar>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="1000 Roses Cardova, Cebu 1000visits" />
            <ListItemAvatar>
              <LocationOn className={classes.iconFontsize} />
            </ListItemAvatar>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="1000 Roses Cardova, Cebu 1000visits" />
            <ListItemAvatar>
              <LocationOn className={classes.iconFontsize} />
            </ListItemAvatar>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="1000 Roses Cardova, Cebu 1000visits" />
            <ListItemAvatar>
              <LocationOn className={classes.iconFontsize} />
            </ListItemAvatar>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="1000 Roses Cardova, Cebu 1000visits" />
            <ListItemAvatar>
              <LocationOn className={classes.iconFontsize} />
            </ListItemAvatar>
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>aaa</div>
      </TabPanel>
    </Paper>
  );
}
export default DashboardList;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    iconFontsize: {
      fontSize: "50px",
    },
  })
);
