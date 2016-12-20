import React, { PropTypes } from 'react'

import './carouselSlider.scss'

class CarouselSlider extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////



  static propTypes = {
    activeIndex: PropTypes.number,
    items: PropTypes.array,
    onClick: PropTypes.func
  }



  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { items, activeIndex, onClick } = this.props

    const buttons = items.map( ( item, index ) => {

      let className = index === activeIndex ? 'slider-active' : 'slider-inactive'

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
