import React, { useEffect } from 'react';
import HeaderLogin from './global-components/login-header';
import Login from './section-components/login';
import Footer from './global-components/footer';


const LoginPage = (props) => {

    
    return <div>
        <HeaderLogin />
        <Login history={props.history}/>
        <Footer />
    </div>
}

export default LoginPage

