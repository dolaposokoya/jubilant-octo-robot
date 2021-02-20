import React, { Component } from 'react';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { selecteOption, getSearchFailure } from './../../actions';
import { connect } from 'react-redux';
import { menu_items } from './../../common/index';
import { bindActionCreators } from 'redux';
class Featured extends Component {
    selectOptions = (parent, child) => {
        console.log("child", child)
        if (!child) {
            child = parent
        }
        if(parent=='avaibility'){
            this.props.getSearchFailure('remove')
        }
        console.log("parent", parent)
        this.props.selecteOption(parent, child)
    }
    render() {
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'
        const { developmentDetail } = this.props


        return <div className="development_menus">
            <ul>
                {developmentDetail && menu_items.map((item, i) =>
                    (developmentDetail[item.value] &&
                        <li key={i} className="relative_position" onClick={(e) => !item.sub_item &&this.selectOptions(item.value, null)}>
                            <img src={publicUrl + 'assets/img/icons/' + item.icon} alt={imagealt} />
                            <p>{item.text}</p>
                            {item.sub_item &&
                                <ul className="sub_menus_development">
                                    {item.sub_item.map((sub_item, i) =>
                                        (developmentDetail[item.value][sub_item.value] && <li key={sub_item.value} onClick={(e) => { e.preventDefault();this.selectOptions(item.value, sub_item.value);  }}>
                                            {sub_item.label}
                                        </li>)
                                    )
                                    }
                                </ul>}
                        </li>

                    ))
                }
                <li key={'available'} className="relative_position" onClick={(e) => this.selectOptions('avaibility', null)}>
                    <img src={publicUrl + 'assets/img/icons/available.png'} alt={imagealt} />
                    <p>Avaibility</p>
                </li>
            </ul>
            <div className="clear"></div>
        </div >
    }
}
const mapStateToProps = (state) => {
    const { developmentDetail } = state.development
    const { user, token, userType } = state.authUser;
    return {
        developmentDetail, user, token, userType
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ selecteOption, getSearchFailure }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Featured);