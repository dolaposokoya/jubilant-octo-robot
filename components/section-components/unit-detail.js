import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { getDevelopmentUnit, setHoldStatus } from './../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
class UnitResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitid: null
        }
    }
    componentDidMount() {
        this.setState({ unitid: this.props.unitid })
        this.setUnitDetail(this.props.unitid);

    }
    setUnitDetail = (id, forceUpdate= false) => {
        if (!this.props.developmentUnitDetail|| forceUpdate) {
            this.props.getDevelopmentUnit(this.props.token, null, id, null, null)
        }
    }

    holdUnhold = async (unitData) => {
        let devlopmentid = unitData.id,
            unitid = unitData.unit_id,
            status = unitData.status !== 'hold' ? 'hold' : 'available'
        this.props.setHoldStatus(this.props.token, devlopmentid, unitid, status);
        let self = this
        setTimeout(() => {
            this.setUnitDetail(this.props.unitid, true)
        }, 2000);
    }

    render() {
        const { UnitDetail } = this.state;
        const { developmentUnitDetail } = this.props;
        console.log("developmentUnitDetail", developmentUnitDetail)
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'
        let data = sectiondata.unitproperties
        let Customclass = this.props.Customclass ? this.props.Customclass : ''
        return <div className={"featured-area  " + Customclass}>
            <div className="container">
                <div className="section-title text-center">
                    {/* <h2 className="title">{'Unit Detail'}</h2> */}
                </div>
                {developmentUnitDetail && developmentUnitDetail && <div className="row justify-content-center">


                    <div className="col-xl-6 col-lg-6">
                        <div className="single-feature style-two">
                            <div className="thumb">
                                <img src={developmentUnitDetail.image} alt="img" />
                                {developmentUnitDetail && developmentUnitDetail.icon &&
                                    <a href="#" className="feature-logo">
                                        <img src={developmentUnitDetail} alt={imagealt} />
                                    </a>
                                }
                            </div>
                            <div className="details">
                                <div className="details-wrap">
                                    <h6 className="title readeal-top"><Link >{developmentUnitDetail.title}</Link></h6>
                                    <p className="sale_price_txt"><b>{developmentUnitDetail.type}</b></p>
                                    <p className="sale_price_txt"><b>Unit {developmentUnitDetail.unit_number} {developmentUnitDetail.floor} floor</b></p>
                                    <p className="sale_price_txt">Sale price  <b>£{developmentUnitDetail.sales_price}</b></p>
                                    <p className="discount_txt">Discount <b>£{developmentUnitDetail.discount}</b> </p>
                                    <p className="investor_price_txt"><span>Investor price</span> <b>£{developmentUnitDetail.investor_price}</b></p>
                                    <ul className="info-list">
                                        {developmentUnitDetail.features.map((features, i) =>
                                            <li key={i} ><i className={features.icon} /> {features.title}</li>
                                        )}
                                        <li><img src={publicUrl + "/assets/img/icons/7.png"} alt={imagealt} /> {developmentUnitDetail.area} sq ft </li>
                                    </ul>
                                    <ul className="contact-list">
                                        <li className="readeal-top"><a className="btn btn-yellow"  >View floorplan</a></li>
                                        <li className="readeal-top"><a className="btn btn-gray" onClick={e => this.holdUnhold(developmentUnitDetail)} >{developmentUnitDetail.status !== 'hold' ? 'Hold' :'Unhold'}</a></li>
                                        {/* <li className="share_development"><img src={publicUrl + data.share_icon} /></li>
                                            <li className="print_development"><img src={publicUrl + data.print_icon} /></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 details">
                        <h5>Development Profile</h5>
                        <div className="row background-change">
                            <div className="col-xl-6 col-lg-6"><b>Planning Consent</b></div>
                            <div className="col-xl-6 col-lg-6">{developmentUnitDetail.planning_consent}</div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6"><b>Completion Date</b></div>
                            <div className="col-xl-6 col-lg-6">{developmentUnitDetail.completion_date}</div>
                        </div>
                        <div className="row background-change">
                            <div className="col-xl-6 col-lg-6"><b>Units</b></div>
                            <div className="col-xl-6 col-lg-6">{developmentUnitDetail.unit_count}</div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6"><b>On-site Parking</b></div>
                            <div className="col-xl-6 col-lg-6">{developmentUnitDetail.onSiteParking}</div>
                        </div>
                        <div className="row background-change">
                            <div className="col-xl-6 col-lg-6"><b>Assured Rental Return</b></div>
                            <div className="col-xl-6 col-lg-6">{developmentUnitDetail.assured_return}%</div>
                        </div>
                    </div>

                </div>}
            </div>
        </div>



    }
}

const mapStateToProps = (state) => {
    const { developmentUnitDetail } = state.development;
    const { user, token, userType } = state.authUser;

    return {
        developmentUnitDetail, user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopmentUnit, setHoldStatus }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UnitResult);