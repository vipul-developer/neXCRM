import React from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({user}) => {
    return (
        <div>
            {user.userData.name}
        </div>
    );
};

export default connect()(withRouter(Dashboard));