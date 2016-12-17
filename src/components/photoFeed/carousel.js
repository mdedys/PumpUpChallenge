import React, { PropTypes }                    from 'react'

import LoadingSpinner                          from '../loadingSpinner'
import Slider                                  from './carouselSlider'
import { MIN_SWIPE_DISTANCE, SWIPE_THRESHOLD,
      SWIPE_LEFT, SWIPE_RIGHT }                from '../../constants/carousel'

import './carousel.scss'

class Carousel extends React.Component {

  constructor() {
    super()

    this.state = {
      direction    : null,
      swipeStart   : null,
      touch        : null,
      initialTouch : null
    }

    this.onTouchStart = this.onTouchStart.bind( this )
    this.onTouchMove = this.onTouchMove.bind( this )
    this.onTouchEnd = this.onTouchEnd.bind( this )
  }

  render() {

    const { activeIndex, photoList, setPhoto } = this.props

    if ( !photoList || photoList.length === 0 ) {
      return (
        <div className = 'carousel' >
          <LoadingSpinner />
        </div>
      )
    }

    return (
      <div
        className    = 'carousel'
        onTouchStart = { this.onTouchStart }
        onTouchMove  = { this.onTouchMove }
        onTouchEnd   = { this.onTouchEnd } >
        <div className = 'carousel-image'>
          <img src = { photoList[activeIndex].link } />
        </div>
        <Slider
          activeIndex = { activeIndex }
          items       = { photoList }
          onClick     = { setPhoto } />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchPhotos()
  }

  onTouchStart( evt ) {
    if ( evt.touches.length !== 1 ) {
      return
    }

    this.setState({
      direction: null,
      initialTouch: evt.touches[0],
      touch: evt.touches[0]
    })
  }

  onTouchMove( evt ) {
    if ( evt.touches.length !== 1 ) {
      return
    }

    let touch = evt.touches[0]
    let direction = this.state.direction

    let swipeLengthX = this._getSwipeLengthX( touch )
    if ( swipeLengthX > SWIPE_THRESHOLD ) {
      direction = this._getSwipeDirection( touch )
    }

    let directionIsUnchanged = this._isSwipeDirectionUnchanged( direction )

    if ( directionIsUnchanged ) {
      this.setState({
        direction: direction,
        touch: touch
      })
      return
    }

    this._resetSwipe()
  }

  onTouchEnd( evt ) {
    if ( !this.state.direction ) {
      return
    }

    if ( this._getSwipeLengthX( this.state.initialTouch ) > MIN_SWIPE_DISTANCE ) {

      const { activeIndex, photoList, setPhoto } = this.props

      if ( this.state.direction === SWIPE_LEFT && activeIndex !== photoList.length - 1 ) {
        setPhoto( activeIndex + 1 )
      } else if ( this.state.direction === SWIPE_RIGHT && activeIndex !== 0 ) {
        setPhoto( activeIndex - 1 )
      }
    }

    this._resetSwipe()
  }

  _getSwipeLengthX( touch ) {
    return Math.abs( touch.pageX - this.state.touch.pageX )
  }

  _getSwipeDirection( touch ) {
    return touch.pageX < this.state.touch.pageX ? 'Left' : 'Right'
  }

  _isSwipeDirectionUnchanged( direction ) {
    return !this.state.direction ||
      this.state.direction === direction
  }

  _resetSwipe() {
    this.setState({
      direction    : null,
      swipeStart   : null,
      touch        : null,
      initialTouch : null
    })
  }
}

Carousel.propTypes = {
  activeIndex : PropTypes.number,
  photoList   : PropTypes.array,
  setPhoto    : PropTypes.func,
  fetchPhotos : PropTypes.func
}

Carousel.defaultProps = {
  activeIndex : null,
  photoList   : null,
  setPhoto    : () => {},
  onSwipe     : () => {}
}

export default Carousel
