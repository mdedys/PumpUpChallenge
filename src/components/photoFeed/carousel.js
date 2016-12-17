import React, { PropTypes } from 'react'

import Slider from './carouselSlider'

import './carousel.scss'

const Carousel = React.createClass({


  ////////////////////
  // PROPS & STATES //
  ////////////////////



  propTypes: {
    activePhoto : PropTypes.object,
    photoList   : PropTypes.array,
    setPhoto    : PropTypes.func,
    fetchPhotos : PropTypes.func
  },



  getDefaultProps() {
    return {
      activePhoto : null,
      photoList   : [],
      setPhoto    : () => {}
    }
  },



  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { activePhoto, photoList, setPhoto } = this.props

    if ( !activePhoto ) {
      return null
    }

    return (
      <div className = 'carousel' >
        <div className = 'carousel-image'>
          <img src = { activePhoto.link } />
        </div>
        <Slider
          activeItem = { activePhoto.id }
          items = { photoList }
          onClick = { setPhoto } />
      </div>
    )
  },


  ///////////////
  // LIFECYCLE //
  ///////////////

  componentDidMount: function() {
    this.props.fetchPhotos()
  },


  ////////////////////
  // EVENT HANDLERS //
  ////////////////////
})

export default Carousel