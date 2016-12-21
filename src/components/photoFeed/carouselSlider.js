import React, { PropTypes } from 'react'

import './carouselSlider.scss'

class CarouselSlider extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////



  static propTypes = {
    activeIndex : PropTypes.number,
    itemList    : PropTypes.array,
    onClick     : PropTypes.func
  }



  ////////////////
  // RENDERINGS //
  ////////////////



  /**
  * Will create slider buttons
  *
  * @param  {Object} item Slider Item context
  * @param  {Number} index Index of slider item
  *
  * @return {Object} Slide item node
  */
  buildSliderItem(item,index) {

    const { activeIndex, onClick } = this.props

    let className =
      index === activeIndex ? 'slider-active' : 'slider-inactive'

    return (
      <li className = {className} key = {item.id} >
        <button
          className = 'slider-button'
          onClick = {onClick.bind(null, index)} />
      </li>
    )
  }


  render() {

    const { itemList } = this.props

    const buttons = itemList.map(this.buildSliderItem.bind(this))

    return (
      <ul className = 'slider' >
        { buttons }
      </ul>
    )
  }
}

export default CarouselSlider
