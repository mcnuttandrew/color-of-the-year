import React from 'react';

import {colors} from '../constants';

import AllPantoneColors from './all-pantone-colors.json';
import {hsl} from 'd3-color';
import {XYPlot, MarkSeries, DecorativeAxis, LineSeries, PolygonSeries} from 'react-vis';

// const hueColors = colors.map((yearColor) => {
//   const hslColor = hsl(yearColor.color);
//   const {h, s, l} = hslColor;
//   return {
//     hue: h,
//     saturation: s,
//     x: l * Math.cos(h),
//     y: l * Math.sin(h),
//     year: yearColor.year,
//     color: yearColor.color,
//     colorName: yearColor.colorName
//     // opacity: 0.7
//   };
// });

const allColors = AllPantoneColors.map(({text, color}) => {
  const hslColor = hsl(color);
  const {h, s, l} = hslColor;
  const hue = h / 360 * Math.PI * 2
  return {
    hue,
    saturation: s,
    x: s * Math.cos(hue),
    y: s * Math.sin(hue),
    color,
    number: Number(text)
  };
}).sort((a, b) => a.number - b.number);

console.log(allColors)

const lines = [...new Array(360 * 2 * 0)].map((e, i) => {
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
        height={1000}
        width={1000}
        xDomain={[-1, 1]}
        yDomain={[-1, 1]}>
        <PolygonSeries
          color={'white'}
          data={[{x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}]} />
        {
          lines.map((line, i) => {
            return (
              <LineSeries
                  data={line}
                  color={hsl(i, 1, 0.5)}
                  key={i}
                  strokeWidth={5}
                  colorType="literal"/>
            );
          })
        }
        {
          allColors.map((color, i) => {
            const precedingColor = (allColors[i - 1] || color);
            return (
              <LineSeries
                  data={[precedingColor, color]}
                  color={color.color}
                  key={i}
                  strokeWidth={1}
                  colorType="literal"/>
            );
          })
          // <LineSeries data={allColors} color="black" opacity={0.5} style={{
          //     strokeDashArray: '2,2'
          //   }}/>
        }
        <MarkSeries data={allColors} colorType="literal" size={2}/>
        {
          // axes
        }
      </XYPlot>
    );
  }
}

HSLColor.display = 'HSLColor';
export default HSLColor;
