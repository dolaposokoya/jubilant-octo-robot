import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { API_URL } from '../../url/apiUrl'
import axios from 'axios'

import { connect } from 'react-redux';
import { getAvailableSearch, setHoldStatus } from '../../actions'
import { bindActionCreators } from 'redux';

class Avaibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developments: [],
            bedrooms: [],
            price: [],
            searchform: { getAvail: true },
            type: [], status: [],
            devid: ''
        }
    }
    componentDidMount() {
        this.getAgentDevelopment()
        let bedrooms = [];
        let type = [], status = []
        for (let i = 1; i < 11; i++) {
            bedrooms.push({ value: i, label: 'Room ' + i })
        }
        let price = []
        for (let i = 1; i < 30; i++) {
            price.push({ value: i * 10000, label: i * 10000 })
        }
        status = [
            { label: 'Available', value: 'available' },
            { label: 'Not Available', value: 'notAvailable' },
            { label: 'Hold', value: 'hold' }
        ]
        type = [{ label: 'Apartment', value: 'apartment' },
        { label: 'Penthouse', value: 'penthouse' },
        { label: 'Studio', value: 'studio' }]
        this.setState({ price: price, bedrooms: bedrooms, type: type, status: status })

        if (this.props.location && this.props.location.search) {
            let getdata = this.props.location.search.split("?")
            let id = getdata[1].split('=')
            if (getdata.length > 1) {
                if (id[0] == 'devid') {
                    console.log("id", id)
                    let searchform = this.state.searchform
                    searchform['development'] = id[1]
                    this.setState({ devid: id[1], searchform: searchform })
                }

            }

        }
    }

    getAgentDevelopment = async () => {
        try {
            const token = localStorage.getItem('tokenweb')
            const headers = { 'token': `Bearer ${token}` }
            const response = await axios.get(`${API_URL.getAssignedDevelopment}`, { headers });
            if (response) {
                this.setState({ developments: response.data.data.developments })
            }
            const $ = window.$;
            let self = this
            if ($('.single-select').length) {
                $('.single-select').niceSelect();
                $('.single-select').change(function (e) {
                    self.onSelect(e)
                })
            }
        }
        catch (error) {
            console.log(error);
        }
        let searchform = this.state.searchform
        this.props.getAvailableSearch(this.props.token, searchform)
    }

    onSelect = (event) => {
        let { searchform } = this.state;
        const { value, name } = event.target

        searchform[name] = value
        this.setState({ searchform: searchform })
    }

    search = async () => {
        let { searchform } = this.state;
        this.props.getAvailableSearch(this.props.token, searchform)
    }

    holdUnhold = async (unitData) => {
        let devlopmentid = unitData.id,
            unitid = unitData.unit_id,
            status = unitData.status !== 'hold' ? 'hold' : 'available'
        this.props.setHoldStatus(this.props.token, devlopmentid, unitid, status);
        let { searchform } = this.state;
        setTimeout(() => {
            this.props.getAvailableSearch(this.props.token, searchform)
        }, 2000);

        // const response = await axios.put(`${API_URL.updateOneUnitStatusDevelopment}?unitid=${unitid}${id ? '&id=' + id : ''}&status=${status}`,
        //     {
        //         status: status,
        //         id: devlopmentid,
        //         unitid: unitid
        //     }, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'token': `Bearer ` + this.props.token
        //     }
        // })
        // if (response) {
        //     this.setState({ developments: response.data.data.developments })
        // }

    }

    render() {
        const { bedrooms, price, type, status } = this.state;
        const { availablesearchUnits } = this.props;
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'
        let Customclass = this.props.Customclass ? this.props.Customclass : ''
        return <div><div className="container">
            <div className="section-title text-center margin-title">
                <h2 className="title">{'Availibilty'}</h2>
            </div>
            <div className="rld-main-search">
                <div className="row">
                    <div className="inline_conatiner">
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select name="status" className="select single-select" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Status</option>
                                    {status && status.map((item) => (
                                        <option value={item.value} >{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select name="type" className="select single-select" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Type</option>
                                    {type && type.map((item) => (
                                        <option value={item.value} >{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="bedrooms" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Bedrooms</option>
                                    {bedrooms && bedrooms.map(item => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="max_price" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disable>Max Price</option>
                                    {price && price.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="min_price" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Min Price</option>
                                    {price && price.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view inline_view_btn">
                            <div>
                                <div className="btn btn-yellow" onClick={this.search}>SEARCH</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
            <div className={"featured-area  " + Customclass}>
                <div className="container">

                    <div className="row justify-content-center">
                        <div>
                            {availablesearchUnits && availablesearchUnits.map((item, i) => (
                                <div className="row avblContnt">
                                    <div className="avblLft">
                            <img src={item.image} /><a>{item.status}</a>
                                    </div>
                                    <div className="avblRght">
                                        <div className="apprtSec">
                                            <div className="apprtSecLft"><label>{item.type}</label></div>
                                            <div className="apprtSecRgth">
                                                {item.features.map((features, i) =>
                                                    <a><img src={publicUrl + "assets/img/icons/7.png"} /><span>{features.title}</span></a>
                                                )}

                                                {/* <a><img src="{publicUrl + "assets/img/icons/7.png" /><span>02 Bath</span></a> */}
                                                {/* <a><img src="{publicUrl + "assets/img/icons/7.png" /><span>401 per sqr ft</span></a> */}
                                            </div>
                                        </div>
                                        <div className="salDiscount">
                                            <a><label>Sale price</label><span>£{item.sales_price}</span></a>
                                            <a><label>Discount</label><span>£{item.discount}</span></a>
                                            <a><label>Investor price</label><span>£{item.investor_price}</span></a>
                                        </div>
                                        <div className="holdShr">
                                            <div className="holdShrLft">
                                                <a><label>5% Reservation</label><span>£{item.reservation}</span></a>
                                                <a><label>25% Exchange</label><span>£{item.exchange}</span></a>
                                                <a><label>70% Completion</label><span>£{item.completion}</span></a>
                                            </div>
                                            <div className="holdShrRght">
                                                <a><img src={publicUrl + "assets/img/icons/floor.png"} /></a>
                                                <a onClick={e => this.holdUnhold(item)} className="imgHold">{item.status == 'hold' ? 'Unhold' : 'Hold'}</a>
                                                <a><img src={publicUrl + "assets/img/icons/share-diff.png"} /></a>
                                                <a><img src={publicUrl + "assets/img/icons/print-diff.png"} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}


                        </div>

                    </div>
                </div>
            </div>
        </div >
    }
}

const mapStateToProps = (state) => {
    const { user, token, userType } = state.authUser;
    const { availablesearchUnits } = state.development;
    console.log("searchUnits", availablesearchUnits)
    return {
        user, token, userType, availablesearchUnits
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAvailableSearch, setHoldStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Avaibility);

