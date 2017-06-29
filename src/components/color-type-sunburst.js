import React from 'react';

import {colors} from '../constants';

import {Sunburst} from 'react-vis';
import {hsl} from 'd3-color';

const hueColors = colors.map((yearColor) => {
  const hslColor = hsl(yearColor.color);
  return {
    hue: hslColor.h,
    saturation: hslColor.s,
    x: yearColor.year,
    color: yearColor.color,
    colorName: yearColor.colorName,
    // opacity: 0.7,
    size: 1
  };
});

const sortedData = hueColors.reduce((res, row) => {
  if (row.hue < 120) {
    res.r.push(row);
  }
  if (row.hue > 120 && row.hue < 240) {
    res.g.push(row);
  }
  if (row.hue > 240) {
    res.b.push(row);
  }
  return res;
}, {r: [], g: [], b: []});

const data = {
  children: [
    {color: '#f00', children: sortedData.r.sort((a, b) => a.x - b.x)},
    {color: '#0f0', children: sortedData.g.sort((a, b) => a.x - b.x)},
    {color: '#00f', children: sortedData.b.sort((a, b) => a.x - b.x)}
  ]
};

class ColorTypeSunburst extends React.Component {
  render() {
    return (
      <div className="color-type-sunburst">
        <Sunburst height={200} width={200} data={data} colorType="literal" hideRootNode/>
      </div>);
  }
}
ColorTypeSunburst.displayName = 'ColorTypeSunburst';
export default ColorTypeSunburst;
