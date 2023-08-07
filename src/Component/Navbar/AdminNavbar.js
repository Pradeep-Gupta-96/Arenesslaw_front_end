import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import {
  Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, CssBaseline, Typography, IconButton, Avatar, Menu, Tooltip
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'rgb(28 121 216 / 80%)', // Set the background color to transparent with 50% opacity
  backdropFilter: 'blur(6px)', // Apply a blur effect
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Iconscss = styled('div')(({ theme }) => ({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  transition: "transform 0.5s ease",
  "&:hover": { color: "#1a237e", transform: "rotate(360deg)" }
}));

export default function AdminNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [username] = useState('');
  let [DrawerList] = useState('');
  let [settings] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigation = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    console.log("settings")
    setAnchorElUser(null);
  };

  if (JSON.parse(localStorage.getItem("role")) === "Admin"){
    DrawerList = [
      {
        text: "Dashboard",
        icons: <HomeIcon />,
        forNavigation: () => {
          navigation('/notice')
        }
      },
    ]
  }else{
    DrawerList = [
      {
        text: "Dashboard",
        icons: <HomeIcon />,
      
      },
    ]
  }

  const ListItemCSS = { display: 'block', cursor: "pointer", transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(1.2)" } }
  const settingsCSS = { display: 'block', cursor: "pointer", p: 1, px: 5, transition: "transform 0.5s ease", "&:hover": { color: "#1a237e", transform: "scale(1.2)" } }


  if (JSON.parse(localStorage.getItem("role")) === "Admin") {
    settings = [
      {
        text: "Create New Account",
        forClicke: () => {
          navigation('/signup')
        }
      },
      {
        text: "Reset Password",
        forClicke: () => {
          navigation('/resetpass')
        }
      },
      {
        text: "Logout",
        forClicke: () => {
          localStorage.clear()
          navigation('/')
        }
      },
    ]
  } else {
    settings = [
      {
        text: "Reset Password",
        forClicke: () => {
          navigation('/resetpass')
        }
      },
      {
        text: "Logout",
        forClicke: () => {
          localStorage.clear()
          navigation('/')
        }
      }
    ]
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigation('/')
    }
  })


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#ffffff", color:"#808080"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.2)" }
          }} noWrap component="div">
            {(username === "") ? JSON.parse(localStorage.getItem("username")) : " "}
          </Typography>

          {/* ============== profile ========= */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ marginLeft: "auto", p: 0 }}>
              <Avatar sx={{
                backgroundColor: "#9c27b0", transition: "transform 0.5s ease",
                "&:hover": { transform: "scale(1.2)" }
              }} alt={`${JSON.parse(localStorage.getItem("username"))}`} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((item, index) => {
              const { text, forClicke } = item;
              return <ListItem key={index} disablePadding sx={settingsCSS} onClick={forClicke}> {text}</ListItem>
            })}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant='h5' sx={{ position: "absolute", left: 25 }}>RECQARZ</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

        </DrawerHeader>

        <List>
          {DrawerList.map((item, index) => {
            const { text, icons, forNavigation } = item;
            return (
              <ListItem key={index} disablePadding sx={ListItemCSS} onClick={forNavigation}>
                <ListItemButton key={index}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconscss> {icons}</Iconscss>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
  );
} 