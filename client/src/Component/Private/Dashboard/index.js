import React, { Component } from 'react'
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                Dashboard
            </div>
        )
    }
}
export default connect()(withRouter(Dashboard));