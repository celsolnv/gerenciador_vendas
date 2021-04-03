import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography, useTheme } from "@material-ui/core";
import {Menu} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    }, 
    appBar:{
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
          },

    }

}));

export default function Navbar(){
    const theme = useTheme();
    const classes = useStyles();
    return( 
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu"
                    
                    >
                    <Menu />
                </IconButton>
            </Toolbar> 
    </AppBar>
    )
}