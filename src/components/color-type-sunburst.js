import React from 'react';

import {colors} from '../constants';

import {Sunburst, LabelSeries, Hint} from 'react-vis';
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
    {color: '#0dd', children: sortedCMYData.c.sort((a, b) => a.x - b.x)},
    {color: '#d0d', children: sortedCMYData.m.sort((a, b) => a.x - b.x)},
    {color: '#dd0', children: sortedCMYData.y.sort((a, b) => a.x - b.x)}
  ]
};

const RGBdata = {
  children: [
    {color: '#a00', children: sortedRGBData.r.sort((a, b) => a.x - b.x)},
    {color: '#0a0', children: sortedRGBData.g.sort((a, b) => a.x - b.x)},
    {color: '#00a', children: sortedRGBData.b.sort((a, b) => a.x - b.x)}
  ]
};

function buildValue(hoveredCell) {
  const {radius, angle, angle0} = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle)
  };
}

export default class ColorTypeSunburst extends React.Component {
  state = {
    hoveredCell: false
  }
  render() {
    const {hoveredCell} = this.state;
    const {colorName, year} = hoveredCell;
    const {useRGB} = this.props;
    return (
      <Sunburst
        className="color-type-sunburst"
        height={300}
        width={300}
        data={useRGB ? RGBdata : CMYdata}
        colorType="literal"
        onValueMouseOver={v => this.setState({hoveredCell: v.x && v.y ? v : false})}
        onValueMouseOut={v => this.setState({hoveredCell: false})}
        hideRootNode>
        {hoveredCell && year ? <Hint value={buildValue(hoveredCell)}>
          <div className="tooltip">
            {`${year} ~ ${colorName}`}
          </div>
        </ Hint> : null}
        <LabelSeries data={[{x: 0, y: 10, label: useRGB ? 'RGB' : 'CMYK'}]} />
      </Sunburst>
    );
  }
}
