import React, { Component } from 'react'
import Header from "../../Component/Private/Header";
class Private extends Component {
    render() {
        return (
            <div>
                <Header>
                    {this.props.children}
                </Header>
            </div>
        )
    }
}

export default Private;