import { Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({
    drawer:{
        width: 240,
        flexShrink: 0,
    },
    drawerPaper:{
        width: 240,
        borderRight: 'none',
        background: theme.palette.primary.main,
    },
    toolbar: theme.mixins.toolbar,
    listIcon : {
        width:'24px',
        height:'24px',

    },
    listItemText:{
        color: theme.palette.primary.contrastText
    },
    listItem:{
        padding: theme.spacing(3),
    }
}));

export default function SideMenu() {
    const theme = useTheme();
    const classes = useStyles();

    return (
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
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

                    {/* <Divider /> */}
                </div>
            </Drawer>
    )
}