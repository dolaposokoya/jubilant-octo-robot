import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import AlertMessage from './alertMessage'
import { API_URL } from '../../url/apiUrl'
import { connect } from 'react-redux';
import { signinUserInFirebase, checkToken } from '../../actions'
import { bindActionCreators } from 'redux';
const publicUrl = process.env.PUBLIC_URL + '/'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            successMessage: "",
        }
    }

    componentDidMount = async () => {
        await this.getTokenForVerification()
    }

    getTokenForVerification = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axios.get(`${API_URL.checkToken}=${token}`)
                if (response && response.data.success === false) {
                    window.location.assign("/agent");
                    localStorage.removeItem('token')
                }
                else if (response.data.success === true && response.data.data.token_verified === true) {
                    window.location.assign("/agent#/home-v1");
                }
            }
            else {
                return null
            }
        }
        catch (error) {
            throw error
        }
    //    this.props.checkToken(this.props.token, this.props.history)
    }

    handleChange = (event) => {
        const isCheckbox = event.target.type === 'checkbox'
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        })
    }

    loginUser = async (event) => {
        try {
            event.preventDefault()
            let formData = {
                email: this.state.email,
                password: this.state.password,
            }
            if (formData.email === '' || formData.email === null || formData.email === undefined) {
                this.setState({ errorMessage: 'Email is empty' })
                setTimeout(() => this.setState({ errorMessage: '' }), 3300);
            }
            else if (formData.password === '' || formData.password === null || formData.password === undefined) {
                this.setState({ errorMessage: 'Password is empty' })
                setTimeout(() => this.setState({ errorMessage: '' }), 3300);
            }
            else {
                setTimeout(() => this.setState({ successMessage: '' }), 3300);
                const data = formData
                const url = `${API_URL.loginUser}`
                const response = await axios({ method: 'post', url: url, data });
                if (response) {
                    if (response.data.success === true) {
                        this.setState({ successMessage: response.data.message })
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('firstName', response.data.data.firstName)
                        localStorage.setItem('lastName', response.data.data.lastName)
                        window.location.assign("/agent#/home-v1");
                    }
                    else {
                        this.setState({ errorMessage: response.data.message })
                        setTimeout(() => this.setState({ errorMessage: '' }), 3300);
                    }
                }
                else {
                    this.setState({ errorMessage: 'Something went wrong' })
                    setTimeout(() => this.setState({ errorMessage: '' }), 4000);
                }
                console.log("this.props.history", this.props.history)
                console.log("formData", formData)
                this.props.signinUserInFirebase(formData,this.props.history)
                
            }
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
            setTimeout(() => this.setState({ errorMessage: '' }), 4000);
        }
    }


    render() {
        const { errorMessage, successMessage } = this.state
        return (
            <div>
                <AlertMessage errorMessage={errorMessage} successMessage={successMessage} />
                <div className="container mt-5 col-md-4" style={{ backgroundColor: '#e3e3e3', padding: '30px', marginBottom: '59px' }}>
                    <form >
                        <div className="form-group">
                            <input type="text" name="email" placeholder="Email" value={this.email} onChange={this.handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Password" value={this.password} onChange={this.handleChange} className="form-control" />
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary" onClick={this.loginUser}>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    const { user, token, userType } = state.authUser;
    return {
        user, token, userType 
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({signinUserInFirebase, checkToken}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);