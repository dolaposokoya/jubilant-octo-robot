import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDevelopmentUnit, setHoldStatus } from './../../actions';
import { bindActionCreators } from 'redux';
class SearchResult extends Component {

    redirecTo = (redirecturl, id, unitid) => {
        console.log("redirecturl", redirecturl)
        this.props.getDevelopmentUnit(this.props.token, id, unitid, redirecturl, this.props.history)
    }

    holdUnhold = async (unitData) => {
        let devlopmentid = unitData.id,
            unitid = unitData.unit_id,
            status = unitData.status !== 'hold' ? 'hold' : 'available'
        this.props.setHoldStatus(this.props.token, devlopmentid, unitid, status);
        
    }

    render() {
        const { searchUnits } = this.props
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'
        let data = sectiondata.unitproperties
        let Customclass = this.props.Customclass ? this.props.Customclass : ''
        return <div className={"featured-area  " + Customclass}>
            <div className="container">
                <div className="section-title text-center">
                    <h2 className="title">{'Search Result'}</h2>
                </div>
                <div className="row justify-content-center">

                    {searchUnits && searchUnits.map((item, i) =>
                        <div key={i} className="col-xl-6 col-lg-6">
                            <div className="single-feature style-two">
                                <div className="thumb">
                                    <img src={item.image} alt="img" />
                                    {item.icon &&
                                        <a href="#" className="feature-logo">
                                            <img src={item.image} alt={imagealt} />
                                        </a>
                                    }
                                </div>
                                <div className="details">
                                    <div className="details-wrap">
                                        <h6 className="title readeal-top"><Link to={item.url}>{item.title}</Link></h6>
                                        <p className="sale_price_txt"><b>{item.type}</b></p>
                                        <p className="sale_price_txt"><b>Unit {item.unit_number} {item.floor} floor</b></p>
                                        <p className="sale_price_txt">Sale price  <b>£{item.sales_price}</b></p>
                                        <p className="discount_txt">Discount <b>£{item.discount}</b> </p>
                                        <p className="investor_price_txt"><span>Investor price</span> <b>£{item.investor_price}</b></p>
                                        <ul className="info-list">
                                            {item.features.map((features, i) =>
                                                <li key={i} ><i className={features.icon} /> {features.title}</li>
                                            )}
                                            <li><img src={publicUrl + "/assets/img/icons/7.png"} alt={imagealt} /> {item.area} sq ft</li>
                                        </ul>
                                        <ul className="contact-list">
                                            <li className="readeal-top"><a className="btn btn-yellow" onClick={() => this.redirecTo(item.url, item.id, item.unit_id)} >View Details</a></li>
                                            <li className="readeal-top"><a className="btn btn-gray" onClick={e => this.holdUnhold(item)}>{item.status !== 'hold' ? 'Hold' :'Unhold'}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>



    }
}

const mapStateToProps = (state) => {
    const { searchUnits } = state.search;
    const { user, token, userType } = state.authUser;

    return {
        searchUnits, user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopmentUnit, setHoldStatus }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);