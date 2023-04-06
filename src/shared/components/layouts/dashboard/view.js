import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { noop } from "../../../constants";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  backgroundColor: "#F2F2F2",
  marginLeft: theme.spacing(9),
  width: `calc(100% - ${theme.spacing(9)})`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#003333",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(9)
    })
  }
}));

const DashboardView = ({
  open = false,
  children = <></>,
  toggleDrawer = noop,
  listItems = []
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveItem = (itemRoute) => {
    let isActive = false;
    const currentPath = location.pathname;
    if (currentPath === itemRoute || currentPath === `${itemRoute}/`) {
      isActive = true;
    }
    return isActive;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    sessionStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access-token");
    window.location.replace('/');
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar open={open} elevation={0}>
        <Toolbar
          sx={{
            pr: "24px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Box
            sx={{
              display: 'flex',

            }}
          >
            {/* Header section */}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ cursor: 'pointer' }} onClick={handleMenuClick} />
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: !open ? "flex-end" : "space-between",
            px: [1],
            py: [2]
          }}
        >
          {open && (
            <IconButton>
              <LogoDevIcon
                sx={{
                  color: '#fff',
                  fontSize: 48
                }}
              />
            </IconButton>
          )}
          <IconButton onClick={toggleDrawer}>
            <MenuOpenIcon sx={{ color: "common.white" }} />
          </IconButton>
        </Toolbar>
        <List
          component="nav"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {listItems.map((item) => {
            return (
              <ListItem
                sx={{
                  width: "80%",
                  border: "1px solid #C0C0BC",
                  borderRadius: 2,
                  backgroundColor: isActiveItem(item.to) && "secondary.main",
                  color: "common.white",
                  display: "flex",
                  justifyContent: "flex-start",
                  m: 1,
                  cursor: "pointer"
                }}
                onClick={() => navigate(`${item.to}`)}
              >
                {item.icon}
                <Typography variant="body1" sx={{ ml: 3, p: "2px" }}>
                  {item.label}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          mt: "68px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardView;
