import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import { configureStore } from './store';

import App from './container/App'
class Root extends Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <Router>
                    <HashRouter basename="/">
                        <Switch>
                            <Route path="/" component={App} />
                        </Switch>

                    </HashRouter>
                </Router>
            </Provider>
        )
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('realdeal'));
