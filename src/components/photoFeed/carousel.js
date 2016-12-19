import React, { PropTypes }                    from 'react'

import Slider                                  from './carouselSlider'
import { MIN_SWIPE_DISTANCE, SWIPE_THRESHOLD,
      SWIPE_LEFT, SWIPE_RIGHT }                from '../../constants/carousel'

import './carousel.scss'

class Carousel extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////

  static propTypes = {
    items   : PropTypes.array,
  }

  constructor() {
    super()

    this.state = {
      direction    : null,
      swipeStart   : null,
      touch        : null,
      initialTouch : null,
      activeIndex  : 0
    }

    this.onTouchStart = this.onTouchStart.bind( this )
    this.onTouchMove = this.onTouchMove.bind( this )
    this.onTouchEnd = this.onTouchEnd.bind( this )
    this.setPhoto = this.setPhoto.bind( this )
  }



  ////////////////
  // RENDERINGS //
  ////////////////

  render() {

    const { items } = this.props

    return (
      <div
        className    = 'carousel'
        onTouchStart = { this.onTouchStart }
        onTouchMove  = { this.onTouchMove }
        onTouchEnd   = { this.onTouchEnd } >
        <div className = 'carousel-image'>
          <img src = { items[this.state.activeIndex].link } />
        </div>
        <Slider
          activeIndex = { this.state.activeIndex }
          items       = { items }
          onClick     = { this.setPhoto } />
      </div>
    )
  }



  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  setPhoto( index ) {
    this.setState( { activeIndex: index } )
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

    let swipeLengthX = this.getSwipeLengthX( touch )
    if ( swipeLengthX > SWIPE_THRESHOLD ) {
      direction = this.getSwipeDirection( touch )
    }

    let directionIsUnchanged = this.isSwipeDirectionUnchanged( direction )

    if ( directionIsUnchanged ) {
      this.setState({
        direction: direction,
        touch: touch
      })
      return
    }

    this.resetSwipe()
  }

  onTouchEnd( evt ) {
    if ( !this.state.direction ) {
      return
    }

    if ( this.getSwipeLengthX( this.state.initialTouch ) > MIN_SWIPE_DISTANCE ) {

      const { items } = this.props
      const { activeIndex } = this.state

      if ( this.state.direction === SWIPE_LEFT && activeIndex !== items.length - 1 ) {
        this.setState({ activeIndex: activeIndex + 1 })
      } else if ( this.state.direction === SWIPE_RIGHT && activeIndex !== 0 ) {
        this.setState({ activeIndex: activeIndex - 1 })
      }
    }

    this.resetSwipe()
  }



  ////////////////////
  // HELPER METHODS //
  ////////////////////

  getSwipeLengthX( touch ) {
    return Math.abs( touch.pageX - this.state.touch.pageX )
  }

  getSwipeDirection( touch ) {
    return touch.pageX < this.state.touch.pageX ? 'Left' : 'Right'
  }

  isSwipeDirectionUnchanged( direction ) {
    return !this.state.direction ||
      this.state.direction === direction
  }

  resetSwipe() {
    this.setState({
      direction    : null,
      swipeStart   : null,
      touch        : null,
      initialTouch : null
    })
  }
}

export default Carousel
