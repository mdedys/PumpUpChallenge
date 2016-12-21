import React, { PropTypes } from 'react'

import './carouselSlider.scss'

class CarouselSlider extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////



  static propTypes = {
    activeIndex: PropTypes.number,
    itemList: PropTypes.array,
    onClick: PropTypes.func
  }



  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { itemList, activeIndex, onClick } = this.props

    const buttons = itemList.map( ( item, index ) => {

      let className =
        index === activeIndex ? 'slider-active' : 'slider-inactive'

      return (
        <li className = { className } key = { item.id } >
          <button
            className = 'slider-button'
            onClick = { onClick.bind( null, index ) } />
        </li>
      )
    })

    return (
      <ul className = 'slider' >
        { buttons }
      </ul>
    )
  }
}

export default CarouselSlider
