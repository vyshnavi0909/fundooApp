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
import { Button, Divider, Paper, Popper } from "@material-ui/core";
import { useState } from "react";
import store from "../../store/store";
import { connect } from "react-redux";

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

function DashBoard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openProfile, setProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchDisplay, setsearch] = useState("none");
  const [pageTitle, setTitle] = useState("Notes");
  const [bgColor, setBg] = useState({
    noteColor: "#feefc3",
    remColor: "#fff",
    labelColor: "#fff",
    archColor: "#fff",
    trashColor: "#fff",
  });
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
      props.dispatch({ type: "Notes" });
      history.push("/dashboard");
    } else if (url === "reminder") {
      props.dispatch({ type: "Reminder" });
      history.push("/dashboard/reminder");
    } else if (url === "editlabel") {
      props.dispatch({ type: "Label" });
      history.push("/dashboard/editlabels");
    } else if (url === "archive") {
      props.dispatch({ type: "Archive" });
      history.push("/dashboard/archive");
    } else if (url === "trash") {
      props.dispatch({ type: "Trash" });
      history.push("/dashboard/trash");
    }
  };

  const handleSearchBar = () => {
    setsearch("flex");
    document.getElementById("resp-search-icon").style.display = "none";
    document.getElementById("keep-heading").style.display = "none";
    document.getElementById("header-icons").style.width = "50%";
  };

  store.subscribe(() => {
    let title = store.getState().titleReducer.heading;
    let active = store.getState().listColorReducer.active;
    if (title === "Notes") {
      setTitle(title);
      setBg({
        noteColor: active,
        remColor: "#fff",
        labelColor: "#fff",
        archColor: "#fff",
        trashColor: "#fff",
      });
    } else if (title === "Reminder") {
      setTitle(title);
      setBg({
        noteColor: "#fff",
        remColor: active,
        labelColor: "#fff",
        archColor: "#fff",
        trashColor: "#fff",
      });
    } else if (title === "Label") {
      setTitle(title);
      setBg({
        noteColor: "#fff",
        remColor: "#fff",
        labelColor: active,
        archColor: "#fff",
        trashColor: "#fff",
      });
    } else if (title === "Archive") {
      setTitle(title);
      setBg({
        noteColor: "#fff",
        remColor: "#fff",
        labelColor: "#fff",
        archColor: active,
        trashColor: "#fff",
      });
    } else if (title === "Trash") {
      setTitle(title);
      setBg({
        noteColor: "#fff",
        remColor: "#fff",
        labelColor: "#fff",
        archColor: "#fff",
        trashColor: active,
      });
    }
  });

  document.body.style.backgroundColor = "white";
  document.title = "Dashboard";

  return (
    <div className="dashboard-container">
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
            <div className="dashbd-keep-icon" id="keep-heading">
              <img src={KeepIcon} alt="keep-icon" className="keep-icon" />
              <span>{pageTitle}</span>
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
          <div style={{ display: searchDisplay }} className="resp-search-bar">
            <div className="">
              <SearchIcon fontSize="small" />
            </div>
            <div className="">
              <InputBase
                placeholder="Search…"
                className="resp-search-input"
                style={{ paddingLeft: "5px" }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div className="dashbd-header-icons" id="header-icons">
            <span className="search-icon" id="resp-search-icon">
              <SearchIcon
                style={{ marginTop: "2.5px" }}
                fontSize="small"
                onClick={handleSearchBar}
              />
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
            style={{
              backgroundColor: bgColor.noteColor,
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
          >
            <NotesIcon />
            <span className="list-name">Notes</span>
          </div>
          <div
            className="list-items"
            onClick={() => redirect("reminder")}
            name="reminder"
            style={{
              backgroundColor: bgColor.remColor,
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
          >
            <ReminderIcon />
            <span className="list-name">Reminder</span>
          </div>
          <div
            className="list-items"
            onClick={() => redirect("editlabel")}
            name="label"
            style={{
              backgroundColor: bgColor.labelColor,
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
          >
            <EditIcon />
            <span className="list-name">Edit Label</span>
          </div>
          <div
            className="list-items"
            onClick={() => redirect("archive")}
            name="archive"
            style={{
              backgroundColor: bgColor.archColor,
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
          >
            <ArchiveIcon />
            <span className="list-name">Archive</span>
          </div>
          <div
            className="list-items"
            onClick={() => redirect("trash")}
            name="trash"
            style={{
              backgroundColor: bgColor.trashColor,
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "100px",
            }}
          >
            <TrashIcon />
            <span className="list-name">Trash</span>
          </div>
        </List>
      </Drawer>
      <div className="content-container">
        <Switch>
          <Route exact path="/dashboard" component={Notes}></Route>
          <Route exact path="/dashboard/archive" component={Archive}></Route>
          <Route exact path="/dashboard/trash" component={Trash}></Route>
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
        {
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
        }
      </Popper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(DashBoard);
