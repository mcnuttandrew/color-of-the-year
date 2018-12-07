import React from 'react';

import {colors} from '../constants';
import {hsl} from 'd3-color';

import {XYPlot, HorizontalRectSeries, LabelSeries} from 'react-vis';

const colorHash = colors.reduce((res, clr) => {
  res[clr.year] = clr;
  return res;
}, {});

const colorData = colors.map((yearColor) => {
  const {year, color, colorName} = yearColor;
  const isLeft = !(year % 2);
  return {
    // x0: year,
    // x: year + 1,
    // y: year % 2 ? 1 : 3,
    x0: isLeft ? 1 : 2.5,
    x: isLeft ? 2 : 3.5,
    y: year - (isLeft ? 0 : 1),
    color,
    label: colorName,
    style: {color: 'red'}
  };
});

function getFontColorFromBackground(background) {
  return hsl(background).l > 0.57 ? '#222' : '#eee';
}

class NamesAndBoxes extends React.Component {
  render() {
    return (
      <div className="names-boxes">
        {colors.map(({color, colorName, year}, i) =>
          <div className={`name-box ${!(year % 2) ? 'reversed' : ''}`} key={i}>
            <div className="color-box" style={{
              backgroundColor: color,
              color: getFontColorFromBackground(color)
            }}>
              {year}
            </div>
            <div className="color-name">
              {colorName}
            </div>
          </div>
        )}
      </div>
    );
  }
}

NamesAndBoxes.display = 'NamesAndBoxes';
export default NamesAndBoxes;
