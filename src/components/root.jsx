import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import classnames from 'classnames';

import {colors} from '../constants';
import ColorChannelGraph from './color-channel.jsx';

import {color} from 'd3-color';
import {RadialChart} from 'react-vis';

export default React.createClass({
  displayName : 'App',

  getInitialState() {
    return {
      hoveredRow: false
    }
  },

  renderColorWithName(yearColor) {
    const {hoveredRow} = this.state;
    const colorStyle = {
      backgroundColor: yearColor.color
    };
    const colorBlockClasses = classnames({
      'color-block': true,
      'selected-color-block': hoveredRow.x === yearColor.year
    })
    return (
      <div
        onMouseEnter={() => {this.setState({
          hoveredRow: {
            x: yearColor.year,
            colorName: yearColor.colorName

          }
        })}}
        className={colorBlockClasses}>
        <div className="color-block-color" style={colorStyle}></div>
      </div>
    );
    // <div className="color-block-name">{yearColor.colorName}</div>
  },

  setProperty(nameSpace, value) {
    this.setState({[nameSpace]: value});
  },

  render() {
    const {hoveredRow} = this.state;
    const channelSums = colors.reduce((res, row) => {
      if (hoveredRow && hoveredRow.x !== row.year) {
        return res;
      }
      const d3Color = color(row.color);
      res.r += d3Color.r;
      res.g += d3Color.g;
      res.b += d3Color.b;
      return res;
    }, {r: 0, g: 0, b: 0});

    return (
      <div className="app">
        <div className="project-name">
          <div className="title">Pantone</div>
          <div className="subtitle">Color of the year </div>

        </div>
        <div className="app-content">
          <div className="color-blocks-wrapper">
            {colors.map(this.renderColorWithName)}
          </div>
          <ColorChannelGraph
            setProperty={this.setProperty}
            hoveredRow={this.state.hoveredRow}/>
          <div className="third-column">
            <div className="color-name">
              {hoveredRow ? hoveredRow.colorName : 'ALL COLORS'}
            </div>
            <RadialChart data={[
              {angle: channelSums.r, color: 'red'},
              {angle: channelSums.g, color: 'green'},
              {angle: channelSums.b, color: 'blue'}
            ]} height={300} width={300} colorType="literal" animation={true}/>
          </div>
        </div>
      </div>);
  }
});
