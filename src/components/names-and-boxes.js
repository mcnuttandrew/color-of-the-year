import React from 'react';

import {colors} from '../constants';
import {hsl} from 'd3-color';

const getFontColorFromBackground = color =>
  hsl(color).l > 0.57 ? '#222' : '#eee';

class NamesAndBoxes extends React.PureComponent {
  render() {
    return (
      <div className="names-boxes">
        {colors.map(({color, colorName, year}, i) => (
          <div className={`name-box ${!(year % 2) ? 'reversed' : ''}`} key={i}>
            <div
              className="color-box"
              style={{
                backgroundColor: color,
                color: getFontColorFromBackground(color)
              }}
            >
              {year}
            </div>
            <div className="color-name">{colorName}</div>
          </div>
        ))}
      </div>
    );
  }
}

NamesAndBoxes.display = 'NamesAndBoxes';
export default NamesAndBoxes;
