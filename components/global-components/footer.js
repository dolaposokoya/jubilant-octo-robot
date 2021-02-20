import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import footerdata from '../../data/footerdata.json';

class Footer_v1 extends Component {

  componentDidMount() {
    let publicUrl = process.env.PUBLIC_URL + '/'
    const minscript = document.createElement("script");
    minscript.async = true;
    minscript.src = publicUrl + "assets/js/main.js";

    document.body.appendChild(minscript);
  }

  render() {

    let publicUrl = process.env.PUBLIC_URL + '/'
    let imgattr = "Footer logo"
    const inlineStyle = {
      backgroundImage: 'url(' + publicUrl + footerdata.footerbg + ')'
    }

    return (
      <footer className="footer-area">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-sm-4">
                <a className="footer-logo" href="#"><img src={publicUrl + footerdata.footerlogo} alt={imgattr} /></a>
                <br /> <br />
                <div className="footer_text"><p>Second Floor, Knights Court <br /> Weaver Street, Chester, CH1 2BQ </p></div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    )
  }
}


export default Footer_v1