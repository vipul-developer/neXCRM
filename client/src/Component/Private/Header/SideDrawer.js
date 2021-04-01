import React from 'react';
import { connect } from "react-redux";
import { Link,withRouter } from "react-router-dom";
import { Drawer,List,ListSubheader,ListItem,ListItemText,Collapse } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    list: {
        width: '100%',
        maxWidth: 240,
        paddingTop:20,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
  }));
const SideDrawer = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Drawer 
            className={classes.drawer} 
            anchor="left" 
            variant="persistent" 
            open={props.open} 
            onClose={() => props.onClose(!props.open)}
            classes={{
                paper: classes.drawerPaper,
              }}
        >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Nested List Items
                    </ListSubheader>
                  }
                className={classes.list}
            >
                <ListItem button onClick={() => props.onClose(!props.open)}>
                    <Link to="/users/dashboard"><ListItemText primary="Dashboard"/></Link>
                </ListItem>

                <ListItem button onClick={handleClick}>
                    <ListItemText primary="My account" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => props.onClose(!props.open)}>
                            <Link to="/"><ListItemText primary="my cart" /></Link>
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => props.onClose(!props.open)}>
                            <Link to="/"><ListItemText primary="user profile"/></Link>
                        </ListItem>
                    </List>
                </Collapse>

            </List>
        </Drawer>
    );
};

export default connect()(withRouter(SideDrawer));