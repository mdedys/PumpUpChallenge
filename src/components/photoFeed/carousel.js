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
    itemList   : PropTypes.array,
  }


  constructor() {
    super()

    this.state = {
      direction     : null,
      swipeStart    : null,
      touch         : null,
      initialTouch  : null,
      activeIndex   : 0,
      marginLeft    : 0,
      width : 382 //Max Width of carousel
    }

    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove  = this.onTouchMove.bind(this)
    this.onTouchEnd   = this.onTouchEnd.bind(this)
    this.setPhoto     = this.setPhoto.bind(this)
    this.updateWidth  = this.updateWidth.bind(this)
  }



  ////////////////
  // RENDERINGS //
  ////////////////



  /**
  * Will create image node for carousel
  *
  * @param  {String} link Image url
  * @param  {Number} key Key for containing div
  *
  * @return {Object} Image Node
  */
  buildImage( link, key ) {
    return (
      <div
        key       = {key}
        className = 'carousel-image-container'
        style     = {{width: this.state.width}} >
          <img
            className = 'carousel-image'
            src       = {link} />
      </div>
    )
  }

  /**
  * Will render all the images for the carousel
  *
  * @return {Object[]} Array of react nodes contains images
  */
  renderImages() {
    const { itemList }   = this.props

    let imageList        = []
    let lengthOfItemList = itemList.length

    imageList.push(
      this.buildImage( itemList[lengthOfItemList-1].link, lengthOfItemList-1 )
    )

    for ( let i = 0; i < itemList.length - 1; i++ ) {
      imageList.push(
        this.buildImage( itemList[i].link, i )
      )
    }

    return imageList
  }


  render() {

    const { itemList }                       = this.props
    const { marginLeft, width, activeIndex } = this.state

    let carouselInnerStyle = {
      marginLeft : marginLeft + 'px',
      width      : ( itemList.length * width ) + 'px'
    }

    return (
      <div
        className    = 'carousel-container'
        onTouchStart = {this.onTouchStart}
        onTouchMove  = {this.onTouchMove}
        onTouchEnd   = {this.onTouchEnd} >
        <div className = 'carousel' ref = 'carousel'>
          <div
            className = 'carousel-inner'
            style     = {carouselInnerStyle} >
            { this.renderImages() }
          </div>
        </div>
        <Slider
          activeIndex = {activeIndex}
          itemList    = {itemList}
          onClick     = {this.setPhoto} />
      </div>
    )
  }

  componentDidMount() {

    window.addEventListener('resize', this.updateWidth)

    this.updateWidth()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////



  updateWidth() {
    this.setState({
      width: this.refs.carousel.clientWidth
    })
  }


  /**
  * Handle carousel slider button click. Will change the active index of
  * the carousel to the passed in index.
  *
  * @param  {Number} index Next index of carousel
  *
  * @return {Object[]} Array of react nodes contains images
  */
  setPhoto(index) {
    const { activeIndex, marginLeft, width } = this.state

    if (index === activeIndex) {
      return
    }

    let moveBy = Math.abs((activeIndex - index) * width)

    let updatedMarginLeft
    if (index > activeIndex) {
      updatedMarginLeft = marginLeft - moveBy
    }
    else if (index < activeIndex) {
      updatedMarginLeft = marginLeft + moveBy
    }
    else {
      updatedMarginLeft = marginLeft
    }

    this.setState({
      activeIndex: index,
      marginLeft: updatedMarginLeft
    })
  }


  /**
  * Will initiate a user touch on the screen
  *
  * @param  {Object} evt Browser touch event
  */
  onTouchStart(evt) {
    if (evt.touches.length !== 1) {
      return
    }

    this.setState({
      direction    : null,
      initialTouch : evt.touches[0],
      touch        : evt.touches[0]
    })
  }


  /**
  * Will update the state the of the direction of the swipe
  *
  * @param  {Object} evt Browser touch event
  */
  onTouchMove(evt) {
    if ( evt.touches.length !== 1 ) {
      return
    }

    let touch = evt.touches[0]
    let direction = this.state.direction

    let swipeLengthX = this.getSwipeLengthX(touch)

    if (swipeLengthX > SWIPE_THRESHOLD) {
      direction = this.getSwipeDirection(touch)
    }

    let directionIsUnchanged = this.isSwipeDirectionUnchanged(direction)

    if (directionIsUnchanged) {

      this.setState({
        direction : direction,
        touch     : touch
      })

      return
    }

    this.resetSwipe()
  }


  /**
  * Will end the touch and set activeIndex and marginLeft if the swipe was
  * greater than the MIN_SWIPE_DISTANCE.
  *
  * @param  {Object} evt Browser touch event
  */
  onTouchEnd(evt) {

    if (!this.state.direction) {
      return
    }

    let swipeLengthX = this.getSwipeLengthX(this.state.initialTouch)

    if (swipeLengthX > MIN_SWIPE_DISTANCE) {

      const { itemList } = this.props
      const { activeIndex, marginLeft, width } = this.state

      // Will update index to next index if swipe direction is left and
      // not at the last index
      if (this.state.direction === SWIPE_LEFT
        && activeIndex !== itemList.length - 1) {

        this.setState({
          activeIndex : activeIndex + 1,
          marginLeft  : marginLeft - width
        })
      }
      // Will update index to previous index if swipe direction is right and
      // not at the first index
      else if (this.state.direction === SWIPE_RIGHT
        && activeIndex !== 0) {

        this.setState({
          activeIndex : activeIndex - 1,
          marginLeft  : marginLeft + width
        })
      }

    }

    this.resetSwipe()
  }



  ////////////////////
  // HELPER METHODS //
  ////////////////////



  /**
  * Will get the length in the horizontal direction of the current swipe
  *
  * @param  {Object} touch The current touch event
  *
  * @return {Number} The length of the horizontal swipe
  */
  getSwipeLengthX(touch) {
    return Math.abs(touch.pageX - this.state.touch.pageX)
  }


  /**
  * Will get the direction of the swipe
  *
  * @param {Object} touch The current touch event
  *
  * @return {String} The direction of the swipe
  */
  getSwipeDirection(touch) {
    return touch.pageX < this.state.touch.pageX ? 'Left' : 'Right'
  }


  /**
  * Will determine if the swipe direction has been changed
  *
  * @param {String} direction The current direction of the swipe
  *
  * @return {Bool} Boolean flag showing if the direction changed
  */
  isSwipeDirectionUnchanged(direction) {
    return !this.state.direction ||
      this.state.direction === direction
  }


  /**
  * Reset the swipe and update the current state
  */
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
