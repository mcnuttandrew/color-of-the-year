import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

import {colors} from '../constants';

import {XYPlot, VerticalRectSeries, LineSeries, XAxis, YAxis, Crosshair} from 'react-vis';
import {color} from 'd3-color';

const splitColors = ['r', 'g', 'b'].reduce((res, colorSig) => {
  res[colorSig] = colors.map((yearColor) => {
    const d3Color = color(yearColor.color);
    // const sum = d3Color.r + d3Color.g + d3Color.b;
    return {
      // x0: yearColor.year - 1,
      x: yearColor.year,
      y: color(yearColor.color)[colorSig],
      color: yearColor.color,
      colorName: yearColor.colorName,
      opacity: 0.7
    };
  })
  return res;
}, {});


export default React.createClass({
  displayName : 'ColorChannel',
  propTypes: {
    setProperty: PropTypes.func.isRequired,
    hoveredRow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]).isRequired,
  },

  renderToolTip() {
    const {hoveredRow} = this.state;
    const colorStyle = {
      backgroundColor: hoveredRow.color
    };
    if (!hoveredRow) {
      return null;
    }
    return (
      <div
        className="custom-color-tooltip"
        style={colorStyle}>
      </div>
    );
  },

  render() {
    const {hoveredRow, setProperty} = this.props;
    const colorChannelProps = {
      animation: true,
      height: 250,
      // todo make this flexible
      width: 600,
      stackBy: 'y',
      // yDomain: [0, 1],
      yType: 'linear'
    };

    return (
      <div className="color-channel">
        <XYPlot
          {...colorChannelProps}>
          <XAxis tickFormat={(d) => d}/>

          <VerticalRectSeries
            data={splitColors.r}
            color="red"
            />
          <VerticalRectSeries
            data={splitColors.g}
            color="green"
            />
          <VerticalRectSeries
            data={splitColors.b}
            color="blue"
            />
            <Crosshair
              values={[{x: hoveredRow.x}]}
              children={(<div></div>)} />
        </XYPlot>
        <XYPlot
          {...colorChannelProps}>
          <LineSeries
            data={splitColors.r}
            color="red"
            onNearestX={(x) => setProperty('hoveredRow', x)}
            />
          <LineSeries
            data={splitColors.g}
            color="green"
            onNearestX={(x) => setProperty('hoveredRow', x)}
            />
          <LineSeries
            data={splitColors.b}
            color="blue"
            onNearestX={(x) => setProperty('hoveredRow', x)}
            />
          <Crosshair
            values={[{x: hoveredRow.x}]}
            children={(<div></div>)} />
        </XYPlot>
      </div>);
  }
});
