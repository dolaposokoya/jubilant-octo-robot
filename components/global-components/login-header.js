import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class HeaderLogin extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + '/'
    let DevelopmentTitle = this.props.developmentTitle ? this.props.developmentTitle : null;
    return (
      <div className="container">
        <div className="navbar-area">
          <nav className="navbar navbar-area navbar-expand-lg navbar-area-fixed">
            <div className="container pd-15 display-flex">
              <div className="logo readeal-top">
                <Link to="/"><img src={publicUrl + "/assets/img/logo.png"} alt="logo" /></Link>
              </div>
              <div className="middle_section">
                {DevelopmentTitle &&
                  <div>
                    <h3>{DevelopmentTitle}</h3>
                  </div>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
export default HeaderLogin