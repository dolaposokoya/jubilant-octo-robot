import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { menu_items } from './../../common/index';
import "./modal.css";


class HeaderLogo extends Component {


  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      imageIcon: '',
      name: ''
    }
  }

  componentDidMount = async () => {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const initials = firstName.charAt(0) + lastName.charAt(0);
    this.setState({ name: `${firstName} ${lastName}` })
    // this.setState({ imageIcon: initials })
  }


  logOut = async () => {
    localStorage.removeItem('token');
    window.location.reload()
  }

  showLogOut = async () => {
    console.log('close Pop up')
    if (this.state.showModal === true) {
      this.setState({ showModal: false })
    }
    else {
      console.log('show Pop up')
      this.setState({ showModal: true })
    }
  }

  getSelected = (parentSelect, childSelect) => {
    let select = menu_items.find(ele => ele.value === parentSelect)
    let selectedChild = { text: '', value: '' }
    console.log("childSelect", select, childSelect)
    if (select && select.sub_item) {
      if (childSelect) selectedChild = select.sub_item.find(ele => ele.value === childSelect);
      console.log("selectedChild 1", selectedChild)
      selectedChild = selectedChild ? selectedChild : { text: '', value: '' }
      console.log("selectedChild 2", selectedChild)
    }
    else {
      select = { text: '', value: '' }
    }
    return `${select.text}  ${selectedChild.label && selectedChild.label !== '' ? '-' + selectedChild.label : ''}`
  }

  render() {
    let publicUrl = `${process.env.PUBLIC_URL}/`
    let imgattr = 'logo'
    let anchor = '#'
    const { imageIcon, showModal, name } = this.state
    const { developmentDetail, parentSelect, childSelect, showTitle } = this.props
    let DevelopmentTitle = developmentDetail && developmentDetail.details ? developmentDetail.details.name : null;
    return (
      <div className="container" >
        <div className="navbar-area">
          <nav className="navbar navbar-area navbar-expand-lg navbar-area-fixed">
            <div className="container pd-15 display-flex">
              <div className="logo readeal-top">
                <Link to="/"><img src={`${publicUrl}/assets/img/logo.png`} alt="logo" /></Link>
              </div> 
              {showTitle && <div className="middle_section inner-page-container">
                {DevelopmentTitle &&
                  <div>
                    <h3>{DevelopmentTitle}</h3>
                    <p>{this.getSelected(parentSelect, childSelect)}</p>
                  </div>
                } 
              </div>}
              <div className="right_nav">
                <ul>
                  <li><img src={`${publicUrl}assets/img/development_icon.png`} /></li>
                  <li>
                    <div className="profile_name" data-toggle="modal" data-target="#exampleModal" onClick={this.showLogOut}>
                      {imageIcon ? imageIcon : <img src={`${publicUrl}/assets/img/user.png`} alt="user-image" />}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ top: '-10px', height: '10px' }}>
          {showModal && showModal ? <div className="card cardLayout">
            <div className="card-header content">
              {name && name ? name : null}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item logOut" onClick={this.logOut}><i className={"fa fa-power-off icon"}></i>  Log Out</li>
            </ul>
          </div> : null}
        </div>
        <div className="middle_section middle-new1">
          {DevelopmentTitle &&
            <div>
              <h3>{DevelopmentTitle}</h3>
              <span>Doncaster</span>
              <p>Marketing - Brochures</p>
            </div>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const { developmentDetail, parentSelect, childSelect } = state.development;
  const { user, token, userType } = state.authUser;
  return {
    developmentDetail, parentSelect, childSelect, user, token, userType
  };
}

export default connect(mapStateToProps)(HeaderLogo);

