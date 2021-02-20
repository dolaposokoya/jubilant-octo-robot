import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getDevelopment } from './../../actions'
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import {API_URL} from './../../url/apiUrl'
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'marketing',
            tempSelect: 'brochure'
        }
    }

    componentDidMount() {
        
    }

    render() {
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'
        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 6,
                slidesToSlide: 1,
                partialVisibilityGutter: 40
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 6,
                slidesToSlide: 1,
                partialVisibilityGutter: 40
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 1,
                partialVisibilityGutter: 30
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
        };
        const { developmentDetail,parentSelect,childSelect  } = this.props;
        const { selected, tempSelect} = this.state
        if(developmentDetail)console.log("selected", developmentDetail[parentSelect])
        return <div className="slider-section padding-slide">
            <div className="container">
            {developmentDetail &&  developmentDetail[parentSelect] &&  developmentDetail[parentSelect][childSelect] && <Carousel
                    showDots={false}
                    arrows={true}
                    autoPlaySpeed={3000}
                    autoPlay={false}
                    centerMode={false}
                    className="slider"
                    responsive={responsive}>
                    {developmentDetail[parentSelect][childSelect] && developmentDetail[parentSelect][childSelect].map((sliderdata) => (
                        <div className="slider-item">
                            <img src={!sliderdata.thumbnail?(publicUrl + 'assets/img/development/broucher.png'):(API_URL.BucketURl+sliderdata.thumbnail.filename)} alt={imagealt} />
                            <div className="slider-metadata">
                                <p>{sliderdata.name}</p>
                                <ul>
                                    {sliderdata.fileInfo &&<li><a target="_blank" href={'https://docs.google.com/viewer?url='+API_URL.BucketURl+sliderdata.fileInfo.filename+"&response-content-disposition=inline&embedded=true"}><i className="fa fa-eye" /></a></li>}
                                {sliderdata.fileInfo &&<li><a target="_blank" href={API_URL.BucketURl+sliderdata.fileInfo.filename}><i className="fa fa-download" /></a></li>}
                                    <li><i className="fa fa-share" /></li>
                                </ul>
                            </div>
                        </div>))}
                </Carousel>}
            </div>
        </div>
    }
}
const mapStateToProps = (state) => {
    const { developmentDetail, parentSelect, childSelect  } = state.development
    const { user, token, userType } = state.authUser;
    console.log('parentSelect',parentSelect, childSelect)
    return {
        developmentDetail, user, token, userType, parentSelect, childSelect 
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ getDevelopment }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Slider);