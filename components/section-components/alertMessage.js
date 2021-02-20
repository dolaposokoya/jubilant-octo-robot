import React, { Component } from 'react'

export default class AlertMessage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const alertWarning = {
            color: 'black',
            fontSize: '17px',
            borderRadius: '7px',
            backgroundColor: '#ffa270',
        };
        const alertSuccess = {
            color: 'black',
            fontSize: '20px',
            borderRadius: '7px',
        };
        const alertMessage = {
            position: 'fixed',
            right: 0,
            marginRight: '10px',
            border: 'none',
            zIndex: 900
        }
        const { errorMessage, successMessage } = this.props
        return (
            <div style={alertMessage}>
                {errorMessage ? <div className="alert alert-warning alert-dismissible fade show" role="alert" style={alertWarning}>
                    {errorMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    </button>
                </div> : null}
                {successMessage ? <div className="alert alert-primary alert-dismissible fade show" role="alert" style={alertSuccess}>
                    {successMessage}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    </button>
                </div> : null}
            </div>
        )
    }
}
