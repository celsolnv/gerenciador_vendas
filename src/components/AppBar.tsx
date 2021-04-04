import { AppBar, createStyles, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, useTheme } from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import { useState } from "react";
import Link from './Link';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        listIcon : {
            width:'24px',
            height:'24px',
    
        },
        listItemText:{
            color: theme.palette.primary.contrastText
        },
        listItem:{
            padding: theme.spacing(3),
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            borderRight: 'none',
            background: theme.palette.primary.main,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

// const useStyles = makeStyles((theme) => ({
//     root:{
//         flexGrow: 1,
//     }, 
//     appBar:{
//         zIndex: theme.zIndex.drawer + 1,
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: drawerWidth,
//           },

//     },
//     drawer:{
//         width: 240,
//         flexShrink: 0,
//     },
//     drawerPaper:{
//         width: 240,
//         borderRight: 'none',
//         background: theme.palette.primary.main,
//     },
//     toolbar: theme.mixins.toolbar,
    // listIcon : {
    //     width:'24px',
    //     height:'24px',

    // },
    // listItemText:{
    //     color: theme.palette.primary.contrastText
    // },
    // listItem:{
    //     padding: theme.spacing(3),
    // },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },

// }));
export default function AppBarComponent({children}){
    const theme = useTheme();
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link href="/">
                    <ListItem button classes={{ root: classes.listItem }}>
                        <ListItemIcon>
                            <img className={classes.listIcon} src="icons/order.svg" />
                            </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.listItemText,
                            }}
                            primary={'Pedidos'}
                        />
                    </ListItem>    
                </Link>
                <Link href="/clients">
                    <ListItem button classes={{ root: classes.listItem }}>
                        <ListItemIcon>
                            <img className={classes.listIcon} src="icons/clients.svg" />
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.listItemText,
                            }}
                            primary={'Clientes'}
                        />
                    </ListItem>
                </Link>
                <Link href="/products">
                    <ListItem button classes={{ root: classes.listItem }}>
                        <ListItemIcon> <img className={classes.listIcon} src="icons/product.svg" /> </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.listItemText,
                            }}
                            primary={'Produtos'}
                        />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return(
        <div className={classes.root} >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton 
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                        
                        >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Gerenciador de pedidos
                    </Typography>
                </Toolbar> 
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>

                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}