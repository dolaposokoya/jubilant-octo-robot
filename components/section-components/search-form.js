import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { API_URL } from '../../url/apiUrl'
import axios from 'axios'
import "../global-components/modal.css";

import { connect } from 'react-redux';
import { getSearch } from '../../actions'
import { bindActionCreators } from 'redux';
class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developments: [],
            bedrooms: [],
            price: [],
            searchform: {}
        }
    }
    componentDidMount() {
        this.getAgentDevelopment()
        let bedrooms = []
        for (let i = 1; i < 11; i++) {
            bedrooms.push({ value: i, label: 'Room ' + i })
        }
        let price = []
        for (let i = 1; i < 30; i++) {
            price.push({ value: i * 10000, label: i * 10000 })
        } 
        this.setState({ price: price, bedrooms: bedrooms })
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
    }

    onSelect = (event) => {
        let { searchform } = this.state;
        const { value, name, checked } = event.target
        if (event.target.type == 'checkbox') searchform[name] = checked ? checked : false
        else searchform[name] = value;
        console.log("searchform", searchform)
        this.setState({ searchform: searchform })
    }

    search = async () => {
        let { searchform } = this.state;
        console.log("searchform", searchform)
        this.props.getSearch(this.props.token, searchform)
    }

    addComma(price) {
        let newNum = []
        price && price.map(item => {
            newNum.push(item.label.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
        })
        return newNum
    }

    render() {
        const { developments, bedrooms, price } = this.state;
        let fourItems = []
        let i = 0;
        let value = this.addComma(price)
        while (i <= 3) {
            fourItems.push(bedrooms && bedrooms[i])
            i++
        }
        let publicUrl = process.env.PUBLIC_URL + '/'
        return <div className="container">
            <div className="rld-main-search">
                <div className="row">
                    <div className="inline_conatiner">
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select name="development" className='select single-select' onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Development</option>
                                    <option value="" >The new development has started The new development</option>
                                    {developments && developments.map((item) => (
                                        <option value={item.value} >{item.label}</option>
                                    ))}
                                </select> 
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="bedrooms" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Bedrooms</option>
                                    {/* {bedrooms && bedrooms.map((item, index) => ( 
                                        <option value={item.value}>{item.label}</option>
                                    ))} */}
                                    {fourItems && fourItems.map((item, index) => (
                                        item && <option option value={item.value}> {item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="min_price" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disabled>Min Price</option>
                                    {value && value.map((item) => (
                                        item && <option value={item}>&#163;{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inline_view">
                            <div className="rld-single-select">
                                <select className="select single-select" name="max_price" onChange={(e) => this.onSelect(e)}>
                                    <option value="" selected disable>Max Price</option>
                                    {value && value.map((item) => (
                                        item && <option value={item}>&#163;{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div> 
                        <div className="inline_view inline_view_btn">
                            <div>
                                <div className="btn btn-yellow" onClick={this.search}>SEARCH NOW</div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <p><input type="checkbox" name="getHold" onClick={e => this.onSelect(e)} /> Show properties currently on hold </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    }
}

const mapStateToProps = (state) => {
    const { user, token, userType } = state.authUser;
    return {
        user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getSearch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

