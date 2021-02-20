import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { API_URL } from '../../url/apiUrl'
import axios from 'axios'
import AlertMessage from './alertMessage'
import { getDevelopment, checkToken,getAllDevelopment } from './../../actions'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
const staticImage = `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`
const firstImage = `https://images.unsplash.com/photo-1481253127861-534498168948?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`
class Featured extends Component {

    constructor(props) {
        super(props)
        this.state = {
            developments: '',
            errorMessage: ''
        };
    }

    componentDidMount = async () => {
        await this.getTokenForVerification()
        this.props.getAllDevelopment(this.props.token)
    }

    getTokenForVerification = async () => {
<<<<<<< HEAD
        const token = localStorage.getItem('token')
        if (token) {
            const response = await axios.get(`${API_URL.checkToken}=${token}`)
            if (response && response.data.success === false) {
                window.location.assign("/agent#/");
            }
            else if (response.data.success === true && response.data.data.token_verified === true) {
                await this.getAgentDevelopment()
            }
        }
        else {
            window.location.assign("/agent");
        }
=======
        this.props.checkToken(this.props.token, this.props.history)
>>>>>>> main
    }

    getAgentDevelopment = async () => {
        try {
            const token = localStorage.getItem('tokenweb')
            const headers = { 'token': `Bearer ${token}` }
            const response = await axios.get(`${API_URL.getAgentDevelopment}`, { headers });
            if (response) {
                if (response.data.message === 'Unauthorized Access' && response.data.success === false) {
                    this.setState({ errorMessage: response.data.message })
                    setTimeout(() => this.setState({ errorMessage: '' }), 4000);
                }
                else if (response.data.success === true) {

                    this.setState({ developments: response.data.data })
                }
                else {
                    this.setState({ errorMessage: response.data.message })
                    setTimeout(() => this.setState({ errorMessage: '' }), 3300);
                }
            }
        }
        catch (error) {
            this.setState({ errorMessage: error.message })
            setTimeout(() => this.setState({ errorMessage: '' }), 4000);
        }
    }

    redirecTo = (redirecturl, id) => {
        console.log("id", id)
        this.props.getDevelopment(this.props.token, id, redirecturl, this.props.history)
    }

    render() {

        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image';
        const {alldevelopmentDetail} = this.props
        const { developments, errorMessage } = this.state
        let data = sectiondata.featuredproperties
        let Customclass = this.props.Customclass ? this.props.Customclass : 'pd-top-35'
        let shortDesc;
        return (
            <div>
                <AlertMessage errorMessage={errorMessage} />
                <div className={"featured-area  " + Customclass}>
                    <div className="container">
                        <div className="section-title text-center">
                            <h2 className="title">{'Developments'}</h2>
                        </div>
                        <div className="row ">
<<<<<<< HEAD
                            <div className="col-xl-6 col-lg-8">
                                <div className="single-leading-feature">
                                    <div className="slf-overlay" />
                                    <div className="thumb">
                                        {developments.firstitem.image ? <img src={firstImage} alt={imagealt} /> : <img src={firstImage} alt={imagealt} />}
                                        {data.firstitem && data.firstitem.icon &&
                                            <a href="#" className="feature-logo">
                                                <img src={publicUrl + data.firstitem.icon} alt={imagealt} />
                                            </a>
                                        } 
                                    </div>
                                    <div className="details">
                                        {developments.firstitem.url && <h4 className="title readeal-top"><Link to={developments.firstitem.url}>{developments.firstitem.title && developments.firstitem.title}</Link></h4>}
                                        {developments.firstitem.shortDesc && <span>{shortDesc}</span>}
                                        <ul className="info-list">
                                            <i className={"fa fa-bed"} />
                                            {data.firstitem && data.firstitem.bedrooms && data.firstitem.bedrooms.map((bedroom, i) =>
                                                <span key={i} >{bedroom}</span>
                                            )}
                                            {developments.firstitem.parking && developments.firstitem.parking === true ?
                                                < i className={"fa fa-car"} /> : null
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Development Data */}
                            {developments.items && developments.items.map((item, i) =>
                                <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-feature development-feature">
=======
                            {alldevelopmentDetail && alldevelopmentDetail["firstitem"] &&
                                <div className="col-xl-6 col-lg-8">
                                    <div className="single-leading-feature">
                                        <div className="slf-overlay" />
>>>>>>> main
                                        <div className="thumb">
                                            {alldevelopmentDetail["firstitem"]&& alldevelopmentDetail["firstitem"].imageList && <img src={API_URL.BucketURl + alldevelopmentDetail["firstitem"].imageList} alt={imagealt} />}
                                            {alldevelopmentDetail.firstitem && alldevelopmentDetail.firstitem.icon &&
                                                <a href="#" className="feature-logo">
                                                    <img src={publicUrl + data.firstitem.icon} alt={imagealt} />
                                                </a>
                                            }
                                        </div>
                                        <div className="details">
                                            {alldevelopmentDetail.firstitem.url && <h4 className="title readeal-top"><Link onClick={e => this.redirecTo(alldevelopmentDetail.firstitem.url, alldevelopmentDetail.firstitem.id)}>{alldevelopmentDetail.firstitem.title && alldevelopmentDetail.firstitem.title}</Link></h4>}
                                            {alldevelopmentDetail.firstitem.shortDesc && <span>{shortDesc}</span>}
                                            {alldevelopmentDetail.firstitem.parking && alldevelopmentDetail.firstitem.parking === true &&
                                                <ul className="info-list">
                                                    <i className={"fa fa-car"} />

                                                </ul>}
                                        </div>
                                    </div>
                                </div>}
                            {/* Development Data */}
                          {/* {alldevelopmentDetail} */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {alldevelopmentDetail} = state.development
    const { user, token, userType } = state.authUser;
    return {
        alldevelopmentDetail, user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopment, checkToken,getAllDevelopment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Featured);