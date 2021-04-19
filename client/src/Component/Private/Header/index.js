import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar,Toolbar,IconButton,Typography,Menu,MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import SideDrawer from "./SideDrawer";
import { logoutUser } from "../../../Action/Public/Users";
class Header extends Component {
    state={
        drawerOpen: true,
        anchorEl:null,
        open:false
    }
    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
    }
    userAction = (event) => {
        this.setState({
            anchorEl:(event.currentTarget),
            open:true

        })
    }
    handleClose = () => {
        this.setState({
            anchorEl:null,
            open:false
        })
    };
    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if(response.payload.success){
                this.props.history.push("/");
                this.setState({
                    anchorEl:null,
                    open:false
                })
            }
        })
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
                        <div>
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
                            <Menu
                                id="userAction"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.open}
                                onClose={() => this.handleClose()}
                            >
                                <MenuItem onClick={() => this.handleClose()}>Profile</MenuItem>
                                <MenuItem onClick={() => this.handleClose()}>My account</MenuItem>
                                <MenuItem onClick={() => this.logoutHandler()}>Logout</MenuItem>
                            </Menu>
                        </div>
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