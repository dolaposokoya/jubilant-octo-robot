import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sectiondata from '../../data/sections.json';
import parse from 'html-react-parser';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { connect } from 'react-redux';
import { API_URL } from '../../url/apiUrl'
class Banner extends Component {

  componentDidMount() {

    // const $ = window.$;

    // if ($('.single-select').length) {
    //   $('.single-select').niceSelect();
    // }
  }

  render() {

    let publicUrl = process.env.PUBLIC_URL + '/'
    let imagealt = 'image'
    let data = sectiondata.banner
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 40
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 40
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 30
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
      }
    }
    // let inlineStyle = [{
    //   backgroundImage: 'url(' + publicUrl + '/assets/img/banner/h5.jpg)'
    // },
    // {
    //   backgroundImage: 'url(' + publicUrl + '/assets/img/banner/banner2.jpg)'
    // }, {
    //   backgroundImage: 'url(' + publicUrl + '/assets/img/banner/banner3.jpg)'
    // }]
    let { alldevelopmentDetail, inlineStyle } = this.props;
    console.log("inlineStyle", inlineStyle)
    return <div className="slider-section">
      <div className="container">
        {inlineStyle && inlineStyle.length > 0 && <Carousel
          showDots={true}
          arrows={true}
          autoPlaySpeed={10000}
          autoPlay={true}
          centerMode={false} 
          className="slider"
          responsive={responsive}>
          {inlineStyle && inlineStyle.map(items => (
            <div className="container relative_position banner_image" style={items['image']}>
              <div className="banner-inner-wrap">
                <div className="row">
                  <div className="col-12">
                    <div className="banner-inner">
                      <h1 className="title">{items['title']}</h1>
                      <h3>{'Exciting new investment opportunity'}</h3>
                    </div>
                  </div>
                </div>
                <div className="add_new_development">
                  <img src={publicUrl + '/assets/img/add_new_development.png'} />
                </div>
              </div>
            </div>
          ))}

        </Carousel>}
      </div>
    </div>
    // return <div className="banner-area jarallax">
    //   <div className="container relative_position banner_image" style={inlineStyle}>
    //     <div className="banner-inner-wrap">
    //       <div className="row">
    //         <div className="col-12">
    //           <div className="banner-inner">
    //             <h1 className="title">{'H5'}</h1>
    //             <h3>{'Exciting new investment opportunity'}</h3>
    //           </div> 
    //         </div>
    //       </div>
    //       <div className="add_new_development">
    //         <img src={publicUrl + '/assets/img/add_new_development.png'} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  }
}

const mapStateToProps = (state) => {
  const { alldevelopmentDetail } = state.development
  const { user, token, userType } = state.authUser;
  let inlineStyle = []
  if (alldevelopmentDetail && alldevelopmentDetail['firstitem']) {
    inlineStyle.push(alldevelopmentDetail['firstitem']);
    if (alldevelopmentDetail['items'] && Array.isArray(alldevelopmentDetail['items'])) inlineStyle = [...inlineStyle, ...alldevelopmentDetail['items']]
    inlineStyle = inlineStyle.map(data => {
      let neData = { 'image': { backgroundImage: 'url(' + API_URL.BucketURl + data.imageHome }, title: data.title };
      return neData
    })
  }
  return {
    alldevelopmentDetail, user, token, userType, inlineStyle
  };
}


export default connect(mapStateToProps)(Banner);