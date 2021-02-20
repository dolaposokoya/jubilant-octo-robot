import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch, Redirect } from "react-router-dom";

import HomeV1 from './../components/home-v1';
import HomeV2 from './../components/home-v2';
import HomeV3 from './../components/home-v3';
import HomeV4 from './../components/home-v4';
import Property from './../components/property';
import AvilableProperty from './../components/availavbe-property';
import PropertiesByCity from './../components/properties-by-city';
import RecentProperties from './../components/recent-properties';
import PropertyDetails from './../components/property-details';
import DevelopmentDetails from './../components/development-details';
import About from './../components/about';
import Advisor from './../components/advisor';
import Pricing from './../components/pricing';
import UserList from './../components/user-list';
import Registraion from './../components/registration';
import Error from './../components/error';
import Faq from './../components/faq';
import News from './../components/news';
import NewsDetails from './../components/news-details';
import Contact from './../components/contact';
import SearchMap from './../components/search-map';
import SearchGrid from './../components/search-grid';
import SearchList from './../components/search-list';
import AddNew from './../components/add-property';
import LoginPage from './../components/login-page';

import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { userTypeSuccess } from './../actions/AuthActions';
import { bindActionCreators } from 'redux';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest}) =>
   <Route
      {...rest}
      render={props =>
         authUser
            ? <Component {...props} />
            : <Redirect
               to={{
                  pathname: '/login',
                  state: { from: props.location }
               }}
            />}
   />;

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("this.props", this.props)
    }

    

    render() {
        const { location, match, user, token } = this.props;
        
        if (location && location.pathname === '/') {
            if (token === null) {
                return (<Redirect to={'/login'} />);
            } else {
                return (<Redirect to={'/home-v1'} />);
            }
        }
        return (
            <div>
                {/* <NotificationContainer /> */}
                <Route exact path="/login" component={LoginPage} />
                {/* <Route exact path="/" component={HomeV1} /> */}
                <InitialPath
                    path={`${match.url}home-v1`}
                    authUser={token}
                    component={HomeV1}
                />
               


                <Route path="/about" component={About} />


                <Route path="/error" component={Error} />
                <Route path="/faq" component={Faq} />

                <Route path="/contact" component={Contact} />


                <InitialPath
                    path={`${match.url}development-details`}
                    authUser={token}
                    component={DevelopmentDetails}
                />
               
                {/* <Route path="/development-details" component={DevelopmentDetails} /> */}


            </div>
        )
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { token, user } = authUser;
    return { token, user };
};
const mapDispatchToProps = dispatch => bindActionCreators({ userTypeSuccess }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);


