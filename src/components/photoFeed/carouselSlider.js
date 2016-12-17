import React, { PropTypes } from 'react'

import './carouselSlider.scss'

const CarouselSlider = React.createClass({


  ////////////////////
  // PROPS & STATES //
  ////////////////////



  propTypes: {
    activeItem: PropTypes.number,
    items: PropTypes.array,
    onClick: PropTypes.func
  },



  getDefaultProps() {
    return {
      activeIndex: 0,
      items: [],
      onClick: () => {}
    }
  },



  getInitialState() {
    return {

    }
  },





  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { items, activeItem, onClick } = this.props

    const buttons = items.map( item => {

      let className = item === activeItem ? 'slider-active' : 'slider-inactive'

      return (
        <li className = { className } key = { item } >
          <button
            className = 'slider-button'
            onClick = { onClick.bind( null, item ) } />
        </li>
      )
    })

    return (
      <ul className = 'slider' >
        { buttons }
      </ul>
    )
  }
})

export default CarouselSlider
