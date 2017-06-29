import React from 'react';

import {colors} from '../constants';

import {hsl} from 'd3-color';
import {XYPlot, MarkSeries, DecorativeAxis, LineSeries} from 'react-vis';

const hueColors = colors.map((yearColor) => {
  const hslColor = hsl(yearColor.color);
  const {h, s, l} = hslColor;
  return {
    hue: h,
    saturation: s,
    x: l * Math.cos(h),
    y: l * Math.sin(h),
    year: yearColor.year,
    color: yearColor.color,
    colorName: yearColor.colorName
    // opacity: 0.7
  };
});

const lines = [...new Array(360)].map((e, i) => {
  const angle = Math.PI * 2 * i / 360;
  return [
    {x: 0, y: 0},
    {x: Math.cos(angle), y: Math.sin(angle)}
  ];
});

class HSLColor extends React.Component {
  render() {
    const axes = [0, 2 * Math.PI / 3, 4 * Math.PI / 3].map(angle => {
      return (
        <DecorativeAxis
          key={angle}
          tickValue={t => ''}
          axisStart={{x: 0, y: 0}}
          axisEnd={{x: Math.cos(angle), y: Math.sin(angle)}}
          axisDomain={[-10, 100]}
          />
      );
    });
    return (
      <XYPlot
        className="hsl-channel"
        height={225}
        width={225}
        xDomain={[-1, 1]}
        yDomain={[-1, 1]}>

        {
          lines.map((line, i) => {
            return (
              <LineSeries
                  data={line}
                  color={hsl(i, 0.5, 0.5)}
                  key={i}
                  strokeWidth={1}
                  colorType="literal"/>
            );
          })
        }
        {axes}
        <MarkSeries data={hueColors} colorType="literal"/>
      </XYPlot>
    );
  }
}

HSLColor.display = 'HSLColor';
export default HSLColor;
