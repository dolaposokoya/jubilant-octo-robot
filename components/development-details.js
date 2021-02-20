import React, { Component } from 'react';
import Navbar from './global-components/navbar';
import HeaderLogo from './global-components/header-logo';
import PageHeader from './global-components/page-header';
import DevelopmentMenu from './section-components/development-menu'
import Silder from './section-components/development-slider'
import SearchForm from './section-components/search-form';
import UnitResult from './section-components/unit-detail';
import SearchResult from './section-components/search-result';
import Availbility from './section-components/availability';
import Developments from './section-components/developments';
import DevelopmentDetailsSection from './section-components/development-details';
import RecomandProperties from './section-components/recomand-properties';
import Footer from './global-components/footer';
import { getDevelopment, getDevelopmentUnit, setHoldStatus } from './../actions'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
class PropertyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUnitDetail: null
        }
    }

    componentDidMount() {
        let isUnitDetail = null;
        if (this.props.location && this.props.location.search) {
            let getdata = this.props.location.search.split("?")
            let id = getdata[1].split('=')
            if (getdata.length > 1) {
                if (id[0] == 'devid') {
                    console.log("id", id)
                    this.props.getDevelopment(this.props.token, id[1])
                }
                else if (id[0] == 'unit') {
                    this.props.getDevelopmentUnit(this.props.token, null, id[1])
                    // isUnitDetail = this.props.location.search.split("?").length == 1 ? this.props.location.search.split("?")[1].contains('') : null;
                }
            }

        }
        else {
            this.props.history.push('/home-v1')
        }
    }

    holdUnhold = async (unitData) => {
        let devlopmentid = unitData.id,
            unitid = unitData.unit_id,
            status = unitData.status !== 'hold' ? 'hold' : 'available'
        this.props.setHoldStatus(this.props.token, devlopmentid, unitid, status);
    }

    render() {
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image';
        const { searchUnits, history, developmentDetail, developmentUnitDetail, parentSelect, location } = this.props;
        //    const {isUnitDetail } = this.state;
        let isUnitDetail = null;
        if (this.props.location && this.props.location.search) {
            console.log("this.props.location.search.split('=')[0]", this.props.location.search.split("=")[1])
            isUnitDetail = this.props.location.search.split("=").length > 1 && this.props.location.search.split("=")[0] == '?unit' ? this.props.location.search.split("=")[1] : null;
        }
        // else{
        //     this.props.history.push('/home-v1')
        // }
        return <div>
            <HeaderLogo showTitle={true} props={history} />
            <PageHeader props={history} />
            {parentSelect && parentSelect !== 'avaibility' && <Silder props={history} />}
            {<DevelopmentMenu />}
            {developmentDetail && developmentDetail.description &&
                <div className="container">
                    <div className="development_description pt-50 text-align" dangerouslySetInnerHTML={{ __html: developmentDetail.description.longDesc }}>

                    </div>
                </div>}
            {developmentUnitDetail && <UnitResult unitid={isUnitDetail} />}
            {(!parentSelect || parentSelect !== 'avaibility') &&<SearchForm />}
            {searchUnits && (!parentSelect || parentSelect !== 'avaibility') &&<SearchResult history={history} />}
            {parentSelect && parentSelect == 'avaibility' && <Availbility location={location} history={history}/>}
            <Developments history={this.props.history} />
            <DevelopmentDetailsSection />
            <Footer />
        </div>
    }
}


const mapStateToProps = (state) => {
    const { developmentDetail, developmentUnitDetail, parentSelect, childSelect } = state.development;
    const { searchUnits } = state.search;
    const { user, token, userType } = state.authUser;
    console.log("parentSelect", parentSelect);
    return {
        searchUnits, user, token, userType, developmentDetail, developmentUnitDetail, parentSelect
    };
}
const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopment, getDevelopmentUnit, setHoldStatus }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);

