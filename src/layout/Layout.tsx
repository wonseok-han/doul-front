import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import TopNav from './TopNav';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuRoot: {
    width: '100%',
    maxWidth: 360,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(0deg)',
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: 'rotate(180deg)',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    justifyContent: 'inherit',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MENU = [
  {
    menu_cd: '0000',
    menu_nm: '시스템',
    upper_menu_cd: undefined,
    open: true,
  },
  { menu_cd: '0001', menu_nm: '공통', upper_menu_cd: '0000', open: false },
  {
    menu_cd: '0004',
    menu_nm: '공통코드관리',
    upper_menu_cd: '0001',
    open: false,
  },
  { menu_cd: '0002', menu_nm: '권한', upper_menu_cd: '0000', open: false },
  { menu_cd: '0005', menu_nm: '권한관리', upper_menu_cd: '0002' },
];

const Layout: React.FC = () => {
  const classes = useStyles();
  const [sideOpen, setSideOpen] = useState(true);
  const [menuList, setMenuList] = useState(MENU);

  const handleDrawerOpen = () => {
    setSideOpen(!sideOpen);
  };

  const handleListItemClick = (item: any) => {
    const menu = JSON.parse(JSON.stringify(menuList));

    menu
      .filter(({ menu_cd }: any) => menu_cd === item.menu_cd)
      .forEach((menu: any) => (menu.open = !menu.open));

    setMenuList(menu);
  };

  const makeChildMenu = (item: any) => {
    return (
      <ListItem
        button
        className={classes.nested}
        onClick={() => handleListItemClick(item)}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={item.menu_nm} />
        {item.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopNav sideOpen={sideOpen} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: sideOpen,
          [classes.drawerClose]: !sideOpen,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: sideOpen,
            [classes.drawerClose]: !sideOpen,
          }),
        }}
        open={sideOpen}
      >
        <div className={classes.toolbar}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
            className={classes.menuRoot}
          >
            {menuList.map(
              (item, index) =>
                !item.upper_menu_cd && (
                  <>
                    <ListItem
                      button
                      key={item.menu_cd}
                      onClick={() => handleListItemClick(item)}
                    >
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.menu_nm} />
                      {item.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={item.open} timeout="auto">
                      {menuList
                        .filter(
                          (menuItem) => menuItem.upper_menu_cd == item.menu_cd
                        )
                        .map((menuItem) => makeChildMenu(menuItem))}
                    </Collapse>

                    {/* <Collapse in={item.open} timeout="auto">
                      <List>
                        <ListItem
                          button
                          className={classes.nested}
                          onClick={() => handleListItemClick(item)}
                        >
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.menu_nm}
                            // style={{ width: drawerWidth }}
                          />
                          {item.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <ListItem
                          button
                          // className={classes.nested}
                          onClick={() => handleListItemClick(item)}
                        >
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.menu_nm}
                            // style={{ width: drawerWidth }}
                          />
                          {item.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                      </List>
                    </Collapse> */}
                  </>
                )
            )}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <Typography paragraph>foo</Typography>
      </main>
    </div>
  );
};

export default Layout;
