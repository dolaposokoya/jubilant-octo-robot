import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { API_URL } from '../../url/apiUrl'
import axios from 'axios'
import AlertMessage from './alertMessage'
import { getDevelopment, checkToken, getAllDevelopment } from './../../actions'
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
        this.props.checkToken(this.props.token, this.props.history)
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
        const { alldevelopmentDetail } = this.props
        const { developments, errorMessage } = this.state
        let data = sectiondata.featuredproperties
        let Customclass = this.props.Customclass ? this.props.Customclass : 'pd-top-35'
        let shortDesc;
        console.log('alldevelopmentDetail', alldevelopmentDetail)
        return (
            <div>
                <AlertMessage errorMessage={errorMessage} />
                <div className={"featured-area  " + Customclass}>
                    <div className="container">
                        <div className="section-title text-center">
                            <h2 className="title">{'Developments'}</h2>
                        </div>
                        <div className="row">
                            {alldevelopmentDetail && alldevelopmentDetail["firstitem"] &&
                                <div className="col-xl-6 col-lg-8">
                                    <div className="single-leading-feature">
                                        <div className="slf-overlay" />
                                        <div className="thumb">
                                            {alldevelopmentDetail["firstitem"] && alldevelopmentDetail["firstitem"].imageList && <img onClick={e => this.redirecTo(alldevelopmentDetail.firstitem.url, alldevelopmentDetail.firstitem.id)} src={API_URL.BucketURl + alldevelopmentDetail["firstitem"].imageList} alt={imagealt} />}
                                            {alldevelopmentDetail.firstitem && alldevelopmentDetail.firstitem.status && alldevelopmentDetail.firstitem.status !== 'none' &&
                                                <a href="#" className="feature-logo">
                                                    <img src={publicUrl + (alldevelopmentDetail.firstitem.status == 'sold_out' ? 'assets/img/icons/sold_white_128.png' : 'assets/img/icons/new_white_128.png')} alt={imagealt} />
                                                </a>
                                            }
                                        </div>
                                        <div className="details">
                                            {alldevelopmentDetail.firstitem.url && <h4 className="title readeal-top"><Link onClick={e => this.redirecTo(alldevelopmentDetail.firstitem.url, alldevelopmentDetail.firstitem.id)}>{alldevelopmentDetail.firstitem.title && alldevelopmentDetail.firstitem.title}</Link></h4>}
                                            {alldevelopmentDetail.firstitem.shortDesc && <span dangerouslySetInnerHTML={{ __html: alldevelopmentDetail.firstitem.shortDesc }}></span>}
                                            {alldevelopmentDetail.firstitem &&
                                                <ul className="info-list">
                                                    {alldevelopmentDetail.firstitem.bedrooms && (
                                                        <>
                                                            <li>
                                                                <i className={"fa fa-bed"} />
                                                                {alldevelopmentDetail.firstitem.bedrooms && alldevelopmentDetail.firstitem.bedrooms.map((bedroom, i) =>
                                                                    <span key={i} >{bedroom}</span>
                                                                )}
                                                            </li>
                                                        </>
                                                    )}
                                                    {alldevelopmentDetail.firstitem.bathrooms && (
                                                        <>
                                                            <li key={3} ><i className={"fa fa-bath"} />
                                                                {alldevelopmentDetail.firstitem.bathrooms && alldevelopmentDetail.firstitem.bathrooms.map((bathrooms, i) =>
                                                                    <span key={i} >{bathrooms}</span>
                                                                )}
                                                            </li>
                                                        </>)}
                                                    {alldevelopmentDetail.firstitem.parking && <li><i className={"fa fa-car"} /></li>}
                                                </ul>}
                                        </div>
                                    </div>
                                </div>}
                            {/* Development Data */}
                            {alldevelopmentDetail && alldevelopmentDetail.items && alldevelopmentDetail.items.map((item, i) =>
                                <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-feature development-feature">
                                        <Link onClick={e => this.redirecTo(item.url, item.id)}>
                                            <div className="thumb">
                                                {<img className="image-fixed" src={(item.imageList ? `${API_URL.BucketURl}${item.imageList}` : `${publicUrl}/assets/img/house.jpg`)} alt={imagealt} />}
                                                {item && item.status && item.status !== 'none' &&
                                                    <a href="#" className="feature-logo">
                                                        <img src={publicUrl + (item.status == 'sold_out' ? 'assets/img/icons/sold.png' : 'assets/img/icons/new_white_128.png')} alt={imagealt} />
                                                    </a>
                                                }
                                            </div>
                                        </Link>
                                        <div className="details">
                                            {item.url && <h6 className="title readeal-top"><Link onClick={e => this.redirecTo(item.url, item.id)}>{item.title && item.title}</Link></h6>}
                                            <p dangerouslySetInnerHTML={{ __html: item.shortDesc }}></p>
                                            <ul className="info-list">
                                                {/*{item.bedrooms(
                                                <>*/}
                                                <li >
                                                    <i className={"fa fa-bed"} />
                                                    {item.bedrooms && item.bedrooms.map((bedroom, i) =>
                                                        <span key={i} >{bedroom}</span>
                                                    )}
                                                </li>
                                                {/*</>
                                                )}*/}
                                                {item.bathrooms && (
                                                    <>
                                                        <li ><i className={"fa fa-bath"} />
                                                            {item.bathrooms && item.bathrooms.map((bathrooms, i) =>
                                                                <span key={i} >{bathrooms}</span>
                                                            )}
                                                        </li>
                                                    </>
                                                )}

                                                {item.parking &&
                                                    <li ><i className={"fa fa-car"} /> </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { alldevelopmentDetail } = state.development
    const { user, token, userType } = state.authUser;
    return {
        alldevelopmentDetail, user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopment, checkToken, getAllDevelopment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Featured);