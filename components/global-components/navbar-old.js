import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    render() {
        let publicUrl = process.env.PUBLIC_URL+'/'
        let imgattr = 'logo'
        let anchor = '#'
        return (
            <div>
                <div className="navbar-area">
                <nav className="navbar navbar-area navbar-expand-lg">
                  <div className="container nav-container">
                    <div className="responsive-mobile-menu">
                      <button className="menu toggle-btn d-block d-lg-none" data-toggle="collapse" data-target="#realdeal_main_menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-left" />
                        <span className="icon-right" />
                      </button>
                    </div>
                    <div className="logo readeal-top">
                      <Link to="/"><img src={publicUrl+"/assets/img/logo.png"} alt="logo" /></Link>
                    </div>
                    <div className="nav-right-part nav-right-part-mobile">
                      <Link className="btn btn-yellow" to="/add-property">ADD LISTING <span className="right"><i className="la la-plus" /></span></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="realdeal_main_menu">
                      <ul className="navbar-nav menu-open readeal-top">
                        <li className="menu-item-has-children current-menu-item">
                          <a href="#">Home</a>
                          <ul className="sub-menu">
                            <li><Link to="/">Home 01</Link></li>
                            <li><Link to="/home-v2">Home 02</Link></li>
                            <li><Link to="/home-v3">Home 03</Link></li>
                            <li><Link to="/home-v4">Home 04</Link></li>
                          </ul>
                        </li>
                        <li><Link to="/development-details">Development Details</Link></li>
                        <li className="menu-item-has-children">
                          <a href="#">Property</a>
                          <ul className="sub-menu">
                             <li><Link to="/property">Property</Link></li>
                            <li><Link to="/availavbe-property">Propertys Availavbe</Link></li>
                            <li><Link to="/properties-by-city">Property By City</Link></li>
                            <li><Link to="/recent-properties">Property Recenty</Link></li>
                            <li><Link to="/property-details">Property Details</Link></li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <a href="#">Pages</a>
                          <ul className="sub-menu">
                            <li><Link to="/About">About</Link></li>
                            <li><Link to="/advisor">Advisor</Link></li>
                            <li><Link to="/search-list">Search List</Link></li>
                            <li><Link to="/search-grid">Search Grid</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/user-list">User List</Link></li>
                            <li><Link to="/Registration">Registration</Link></li>
                            <li><Link to="/error">404</Link></li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <a href="#">News</a>
                          <ul className="sub-menu">
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/news-details">News Details</Link></li>
                          </ul>
                        </li>
                        <li><Link to="/contact">Contact Us</Link></li>
                      </ul>
                    </div>
                    <div className="nav-right-part nav-right-part-desktop readeal-top">
                      <Link className="btn btn-yellow" to="/add-property">ADD LISTING <span className="right"><i className="la la-plus" /></span></Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
        )
    }
}


export default Navbar