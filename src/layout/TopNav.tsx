// import AppBar from '@material-ui/core/AppBar';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuIcon from '@material-ui/icons/Menu';
// import { useEffect, useState } from 'react';

// interface TopNavProperties {
//   sideOpen: boolean;
//   handleDrawerOpen?: () => void;
// }

// const TopNav: React.FC<TopNavProperties> = ({
//   sideOpen = true,
//   handleDrawerOpen,
// }: TopNavProperties) => {
//   const useStyles = makeStyles((theme) => ({
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//     },
//     menuButton: {
//       marginLeft: 12,
//       marginRight: 36,
//     },
//     menuButtonIconClosed: {
//       transition: theme.transitions.create(['transform'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       transform: 'rotate(0deg)',
//     },
//     menuButtonIconOpen: {
//       transition: theme.transitions.create(['transform'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       transform: 'rotate(180deg)',
//     },
//     grow: {
//       flexGrow: 1,
//     },
//   }));

//   const classes = useStyles();
//   const [anchor, setAnchor] = useState({ open: false, anchorEl: undefined });

//   const handleAccountMenu = (event: any) => {
//     setAnchor((previous) => ({
//       ...previous,
//       anchorEl: event.currentTarget,
//     }));
//   };

//   const handleAccountClose = () => {
//     setAnchor((previous) => ({
//       ...previous,
//       anchorEl: undefined,
//     }));
//   };

//   useEffect(() => {
//     setAnchor((previous) => ({
//       ...previous,
//       open: Boolean(anchor.anchorEl),
//     }));
//   }, [anchor.anchorEl]);

//   return (
//     <AppBar position="fixed" className={classes.appBar}>
//       <Toolbar disableGutters={true}>
//         <IconButton
//           color="inherit"
//           aria-label="Open drawer"
//           onClick={handleDrawerOpen}
//           className={classes.menuButton}
//         >
//           <MenuIcon
//             classes={{
//               root: sideOpen
//                 ? classes.menuButtonIconOpen
//                 : classes.menuButtonIconClosed,
//             }}
//           />
//         </IconButton>
//         <Typography variant="h6" color="inherit" className={classes.grow}>
//           TEST
//         </Typography>
//         <IconButton
//           aria-owns={sideOpen ? 'menu-appbar' : undefined}
//           aria-haspopup="true"
//           onClick={handleAccountMenu}
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchor.anchorEl}
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           open={anchor.open}
//           onClose={handleAccountClose}
//         >
//           <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
//           <MenuItem onClick={handleAccountClose}>My account</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

import { Nav, Navbar } from 'react-bootstrap';

const TopNav: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand href="#home">Test Bootstrap</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
