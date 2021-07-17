import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotesIcon from "@material-ui/icons/EmojiObjectsOutlined";
import ReminderIcon from "@material-ui/icons/NotificationsOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import TrashIcon from "@material-ui/icons/DeleteOutlined";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import ListViewIcon from "@material-ui/icons/DnsOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import AppsIcon from "@material-ui/icons/AppsOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import KeepIcon from "./keep.png";
import Notes from "../../components/notes/Notes";
import Archive from "../../components/archive/Archive";
import Trash from "../../components/trash/Trash";
import UserServices from "../../services/userServices";
import "./Dashboard.css";
import { Route, Switch, useHistory } from "react-router";
import { Button, Divider, Fade, Paper, Popper } from "@material-ui/core";
import { useState } from "react";

const drawerWidth = 200;
const services = new UserServices();
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function DashBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openProfile, setProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const handleDrawer = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleProfile = (e) => {
    setAnchorEl(e.currentTarget);
    setProfile(!openProfile);
  };

  const handleLogout = () => {
    services
      .LogOut()
      .then((res) => {
        console.log("logged out successfully");
        localStorage.removeItem("token");
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log("logout", err);
      });
  };

  const redirect = (e) => {
    const url = e;

    console.log(url);
    if (url === "notes") {
      history.push("/dashboard");
    } else if (url === "reminder") {
      history.push("/dashboard/reminder");
    } else if (url === "editlabel") {
      history.push("/dashboard/editlabels");
    } else if (url === "archive") {
      history.push("/dashboard/archive");
    } else if (url === "trash") {
      history.push("/dashboard/trash");
    }
  };

  document.body.style.backgroundColor = "white";
  document.title = "Dashboard";

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)} color="inherit">
        <Toolbar className="tool-bar">
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className="dashbd-menu-btn"
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            <div className="dashbd-keep-icon">
              <img src={KeepIcon} alt="keep-icon" className="keep-icon" />
              <span>Keep</span>
            </div>
          </Typography>
          <div className="dashbd-search">
            <div className="dashbd-search-icon">
              <SearchIcon />
            </div>
            <div className="search-bar">
              <InputBase
                placeholder="Search…"
                className="dashbd-inputbase"
                style={{ paddingLeft: 30 + "px" }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div className="dashbd-header-icons">
            <span className="search-icon">
              <SearchIcon fontSize="small" />
            </span>
            <RefreshIcon className="ref-icon icons" />
            <ListViewIcon className="lis-icon icons" id="list-icon" />
            <SettingsIcon className="set-icon icons" />
            <div className="google-icons">
              <AppsIcon className="app-icon icons" />
              <AccountIcon className="acc-icon icons" onClick={handleProfile} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List className="dashbd-list">
          <div
            className="list-items"
            name="notes"
            onClick={() => redirect("notes")}
          >
            <NotesIcon />
            <span className="list-name">Notes</span>
          </div>
          <div className="list-items" onClick={() => redirect("reminder")}>
            <ReminderIcon />
            <span className="list-name">Reminder</span>
          </div>
          <div className="list-items" onClick={() => redirect("editlabel")}>
            <EditIcon />
            <span className="list-name">Edit Label</span>
          </div>
          <div className="list-items" onClick={() => redirect("archive")}>
            <ArchiveIcon />
            <span className="list-name">Archive</span>
          </div>
          <div className="list-items" onClick={() => redirect("trash")}>
            <TrashIcon />
            <span className="list-name">Trash</span>
          </div>
        </List>
      </Drawer>
      <div className="content-container">
        <Switch>
          <Route exact path="/dashboard" component={Notes}></Route>
          <Route path="/dashboard/archive" component={Archive}></Route>
          <Route path="/dashboard/trash" component={Trash}></Route>
        </Switch>
      </div>

      <Popper
        name="more"
        open={openProfile}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{ zIndex: 10, right: 0, width: "200px" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Paper className="profile-popper">
              <div>
                <AccountIcon fontSize="large" />
                <h3>Babbur Vyshnavi</h3>
              </div>
              <Divider />
              <Button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  padding: "5px 10px",
                  fontWeight: "600",
                  margin: "20px",
                }}
              >
                Logout
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
