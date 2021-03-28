import React, { Component } from 'react';
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar,Toolbar,IconButton,Typography  } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import SideDrawer from "./SideDrawer";
class Header extends Component {
    state={
        drawerOpen: true
    }
    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
    }
    userAction = () => {

    }
    render() {
        return (
            <div>
                <AppBar position="fixed" style={{width: this.state.drawerOpen ? `calc(100% - ${240}px)` : "100%"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => this.toggleDrawer(!this.state.drawerOpen)}><MenuIcon/></IconButton>
                        <Typography variant="h6" style={{flexGrow:1}}>
                            NETDOTT
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="userAction"
                            aria-haspopup="true"
                            onClick={(event) => this.userAction(event)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SideDrawer
                    open={this.state.drawerOpen}
                    onClose={(value) => this.toggleDrawer(value)}
                />
                <div style={{marginLeft: this.state.drawerOpen ? "250px" : "0",paddingTop:"70px"}}>{this.props.children}</div>
            </div>
        )
    }
}

export default connect()(withRouter(Header));