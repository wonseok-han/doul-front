import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import FolderIcon from '@material-ui/icons/Folder';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

const MENU = [
  {
    menu_cd: '0000',
    menu_nm: '시스템',
    upper_menu_cd: undefined,
    open: true,
  },
  { menu_cd: '0001', menu_nm: '공통', upper_menu_cd: '0000', open: true },
  {
    menu_cd: '0004',
    menu_nm: '공통코드관2333333322222리',
    upper_menu_cd: '0001',
    open: false,
  },
  { menu_cd: '0002', menu_nm: '권한', upper_menu_cd: '0000', open: false },
  { menu_cd: '0005', menu_nm: '권한관리', upper_menu_cd: '0002' },
  { menu_cd: '1000', menu_nm: '테스트', upper_menu_cd: undefined, open: true },
  { menu_cd: '1001', menu_nm: '권한관리', upper_menu_cd: '1000' },
];

const LEFT_MENU_PADDING = 15;
// const DRAWER_WIDTH = 280;
const DRAWER_WIDTH = 280;
const useStyles = makeStyles((theme) => ({
  menuRoot: {
    width: '100%',
    maxWidth: 360,
    nested: {
      paddingLeft: theme.spacing(4),
    },
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
  drawer: {
    // width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    // width: DRAWER_WIDTH,
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
    width: DRAWER_WIDTH,
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

interface TopNavProperties {
  sideOpen: boolean;
}

const SideMenu: React.FC<TopNavProperties> = ({
  sideOpen,
}: TopNavProperties) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState(MENU);

  const handleListItemClick = (item: any) => {
    const menu = JSON.parse(JSON.stringify(menuList));

    menu
      .filter(({ menu_cd }: any) => menu_cd === item.menu_cd)
      .forEach((menu: any) => (menu.open = !menu.open));

    setMenuList(menu);
  };

  const makeChildMenu = useCallback(
    (item: any, spacing: number) => {
      return (
        <ListItem
          button
          style={{ paddingLeft: spacing }}
          onClick={() => handleListItemClick(item)}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={item.menu_nm} />
          {item.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      );
    },
    [menuList]
  );

  const recursiveChildMenu = useCallback(
    (item: any, spacing: number): any => {
      const addSpacing = spacing + LEFT_MENU_PADDING;
      const filteredList = menuList.filter(
        (menuItem) => menuItem.upper_menu_cd == item.menu_cd
      );

      return (
        filteredList.length > 0 &&
        filteredList.map((menuItem) => {
          return (
            <>
              {makeChildMenu(menuItem, addSpacing)}
              <Collapse in={menuItem.open} timeout="auto">
                {recursiveChildMenu(menuItem, addSpacing)}
              </Collapse>
            </>
          );
        })
      );
    },
    [menuList]
  );
  return (
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
      anchor="right"
      SlideProps={{ direction: 'up' }}
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
          {menuList
            .filter((menuItem) => !menuItem.upper_menu_cd)
            .map((item) => (
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
                  {recursiveChildMenu(item, LEFT_MENU_PADDING)}
                </Collapse>
              </>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
