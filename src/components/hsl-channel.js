import React from 'react';

import AllPantoneColors from './all-pantone-colors.json';
import {hsl} from 'd3-color';
import {XYPlot, MarkSeries, LineSeries, ChartLabel} from 'react-vis';

const allColors = AllPantoneColors.map(({text, color}) => {
  const hslColor = hsl(color);
  const {h, s} = hslColor;
  const hue = h / 360 * Math.PI * 2;
  return {
    hue,
    saturation: s,
    x: s * Math.cos(hue),
    y: s * Math.sin(hue),
    color,
    number: Number(text)
  };
}).sort((a, b) => a.number - b.number);

class HSLColor extends React.Component {
  render() {
    return (
      <XYPlot
        className="hsl-channel"
        height={500}
        width={500}
        xDomain={[-1, 1]}
        yDomain={[-1, 1]}>
        {
          allColors.map((color, i) => (<LineSeries
              data={[(allColors[i - 1] || color), color]}
              color={color.color}
              key={i}
              strokeWidth={1}
              colorType="literal"/>
        ))
        }
        <MarkSeries data={allColors} colorType="literal" size={2}/>
        <ChartLabel
          style={{
            textAnchor: 'end'
          }}
          xPercent={1}
          yPercent={0.87}
          text="all named pantone colors"/>
        <ChartLabel
          style={{
            textAnchor: 'end'
          }}
          xPercent={1}
          yPercent={0.9}
          text="angle by hue/saturation by radius"/>
      </XYPlot>
    );
  }
}

HSLColor.display = 'HSLColor';
export default HSLColor;
