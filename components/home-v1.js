import React, { Component } from 'react';
import HeaderLogo from './global-components/header-logo';
import Banner from './section-components/banner';
import SearchForm from './section-components/search-form';
import SearchResult from './section-components/search-result';
import Developments from './section-components/developments';

import Footer from './global-components/footer';
import { connect } from 'react-redux';

class Home_V1 extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        const { searchUnits, token , history} = this.props;
        return <div>
            <HeaderLogo props={history}/>
            <Banner history={history}/>
            <SearchForm />
            {searchUnits && <SearchResult history={history}/>}
            <Developments history={history}/>
            <Footer />
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

export default connect(mapStateToProps)(Home_V1);

