import React, { Component } from 'react'

class Public extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Public;