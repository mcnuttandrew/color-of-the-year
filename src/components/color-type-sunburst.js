import React from 'react';

import {colors} from '../constants';

import {Sunburst, LabelSeries} from 'react-vis';
import {rgb} from 'd3-color';

const hueColors = colors.map((yearColor) => {
  const {r, g, b} = rgb(yearColor.color);
  const c = (b + g) / 2;
  const m = (r + b) / 2;
  const y = (g + r) / 2;
  return {
    year: yearColor.year,
    color: yearColor.color,
    colorName: yearColor.colorName,
    dominantRGBColor: (r > g && r > b) ? 'r' : ((g > b) ? 'g' : 'b'),
    dominantCMYColor: (c > m && c > y) ? 'c' : ((m > y) ? 'm' : 'y'),
    // opacity: 0.7,
    size: 1
  };
});

const sortedRGBData = hueColors.reduce((res, row) => {
  res[row.dominantRGBColor].push(row);
  return res;
}, {r: [], g: [], b: []});

const sortedCMYData = hueColors.reduce((res, row) => {
  res[row.dominantCMYColor].push(row);
  return res;
}, {c: [], m: [], y: []});

const CMYdata = {
  children: [
    {color: '#0aa', children: sortedCMYData.c.sort((a, b) => a.x - b.x)},
    {color: '#a0a', children: sortedCMYData.m.sort((a, b) => a.x - b.x)},
    {color: '#cd0', children: sortedCMYData.y.sort((a, b) => a.x - b.x)}
  ]
};

const RGBdata = {
  children: [
    {color: '#a00', children: sortedRGBData.r.sort((a, b) => a.x - b.x)},
    {color: '#0a0', children: sortedRGBData.g.sort((a, b) => a.x - b.x)},
    {color: '#00a', children: sortedRGBData.b.sort((a, b) => a.x - b.x)}
  ]
};

class ColorTypeSunburst extends React.Component {
  render() {
    const {useRGB} = this.props;
    return (
      <Sunburst
        className="color-type-sunburst"
        height={300}
        width={300}
        data={useRGB ? RGBdata : CMYdata}
        colorType="literal"
        hideRootNode>
        <LabelSeries data={[{x: 0, y: 0, label: useRGB ? 'RGB' : 'CMYK'}]} />
      </Sunburst>
    );
  }
}
ColorTypeSunburst.displayName = 'ColorTypeSunburst';
export default ColorTypeSunburst;
