import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

import {colors} from '../constants';
import {scaleLinear} from 'd3-scale';

import {XYPlot, VerticalRectSeries, LineSeries, XAxis, YAxis, Crosshair} from 'react-vis';
import {hsl} from 'd3-color';
import * as d3Shape from 'd3-shape';

const hueColors = colors.map((yearColor) => {
  const hslColor = hsl(yearColor.color);
  return {
    hue: hslColor.h,
    saturation: hslColor.s,
    x: yearColor.year,
    color: yearColor.color,
    colorName: yearColor.colorName,
    opacity: 0.7
  };
});

export default React.createClass({
  displayName : 'HSLColor',
  propTypes: {
    setProperty: PropTypes.func.isRequired,
    hoveredRow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]).isRequired,
  },

  renderSpot(colorInfo, index) {
    const {setProperty, hoveredRow} = this.props;
    const rScale = scaleLinear().domain([0, 1]).range([0, 150]);
    // consol.
    return (
      <circle
        className="hsl-color-circle"
        key={`${index}-color`}
        cx={Math.cos(colorInfo.hue) * rScale(colorInfo.saturation)}
        cy={Math.sin(colorInfo.hue) * rScale(colorInfo.saturation)}
        r="10px"
        fill={colorInfo.color}
        stroke="black"
        strokeWidth={colorInfo.color === hoveredRow.color ? 5 : 1}
        onMouseEnter={() => setProperty('hoveredRow', colorInfo)}
      />
    );
  },

  renderGradient() {
    const content = [];
    for (var i = 0; i < 360; i++) {
      content.push(
        <line
          key={`${i}-line`}
          x1="0" y1="0"
          x2={150 * Math.cos(Math.PI * 2 * i / 360)}
          y2={150 * Math.sin(Math.PI * 2 * i / 360)}
          stroke={hsl(i, .5, .6)}
          strokeWidth="2"
          />
      );
    }

    const divisionLines = [60, 180, 300].map(d => {
      return (
        <line
          key={`${d}-divider-line`}
          x1="0" y1="0"
          x2={150 * Math.cos(Math.PI * 2 * d / 360)}
          y2={150 * Math.sin(Math.PI * 2 * d / 360)}
          stroke="black"
          strokeWidth="4"
          />
      )
    })
    return (
      <g
      transform={`translate(${150},${150})`}>
        {content}
        {divisionLines}
      </g>
    )
  },

  render() {
    return (
      <div className="hsl-channel">
        <svg
          width={300}
          height={300}>
          {this.renderGradient()}
          <g
            transform={`translate(${150},${150})`}
            ref="container">
            {hueColors.map(this.renderSpot)}
          </g>
        </svg>
      </div>);
  }
});
