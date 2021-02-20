import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from '../../url/apiUrl';
class Page_header extends Component {
  componentDidMount() {

  }
  render() {

    let HeaderTitle = this.props.headertitle;
    let publicUrl = process.env.PUBLIC_URL + '/'
    let Subheader = this.props.subheader ? this.props.subheader : HeaderTitle;
    const { inlineStyle } = this.props
    
    if(inlineStyle)console.log("inlineStyle", inlineStyle['backgroundImage'])
    return (
      <div className="development_detail banner-area jarallax">
        <div className="container relative_position banner_image">
          {inlineStyle && inlineStyle.backgroundImage && <div className="banner-inner-wrap" style={{'backgroundImage':'url('+inlineStyle['backgroundImage']+')'}}>
            <div className="row">
            </div>
          </div>}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { developmentDetail, parentSelect, childSelect } = state.development
  const { user, token, userType } = state.authUser;
  console.log('parentSelect developmentDetail', developmentDetail)
  let inlineStyle = {}
  if (developmentDetail && developmentDetail.description && developmentDetail.description.mainImages) {
    console.log("evelopmentDetail.description.mainImages", developmentDetail.description.mainImages)
    let image = developmentDetail.description.mainImages.find(ele => ele.makeDetail == true);
    console.log("image", image)
    if (image && image.image) {
      image['backgroundImage'] = API_URL.BucketURl + image['image']
      inlineStyle = image
    }
  }

  return {
    inlineStyle, developmentDetail, user, token, userType, parentSelect, childSelect
  };
}


export default connect(mapStateToProps)(Page_header);