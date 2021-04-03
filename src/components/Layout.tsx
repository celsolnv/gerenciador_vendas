import { createMuiTheme, Hidden, makeStyles, Theme, ThemeProvider } from "@material-ui/core";
import Navbar from '../components/Navbar';
import SideMenu from '../components/SideMenu';
import theme from '../../lib/theme';

const drawerWidth = 240;
const useStyles = makeStyles((theme : Theme) => ({
  root: {
    display:'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  drawer:{
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },  
}));


export default function Layout({children}){
    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Navbar/>
                <nav className={classes.drawer} aria-label="mailbox folders">
                  <SideMenu/>       

                </nav>
                {/* <Hidden smUp implementation="css">
                </Hidden>
                <Hidden xsDown implementation="css">
                    <SideMenu/>       
                </Hidden> */}
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {children}

                </main>
            </div>
        </ThemeProvider>

    )
}
