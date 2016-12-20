import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import classnames from 'classnames';

import {colors} from '../constants';
import ColorChannelGraph from './color-channel.jsx';
import HSLGraph from './hsl-channel.jsx';

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
    const d3Color = color(yearColor.color);
    return (
      <div
        key={`${yearColor.colorName}`}
        onMouseEnter={() => {this.setState({
          hoveredRow: {
            x: yearColor.year,
            colorName: yearColor.colorName

          }
        })}}
        className={colorBlockClasses}>
        <div className="color-block-color" style={colorStyle}></div>
        <div className="color-name">{yearColor.colorName}</div>
        <RadialChart data={[
          {angle: d3Color.r, color: 'red'},
          {angle: d3Color.g, color: 'green'},
          {angle: d3Color.b, color: 'blue'}
        ]} height={40} width={40} colorType="literal" animation={true}/>
      </div>
    );
  },

  setProperty(nameSpace, value) {
    this.setState({[nameSpace]: value});
  },

  render() {
    const {hoveredRow} = this.state;

    return (
      <div className="app">
        <div className="project-name">
          <div className="title">Pantone</div>
          <div className="subtitle">Color of the year </div>

        </div>
        Each year pantone release a new shade of the year. They claim that is "A symbolic color selection; a color snapshot of what we see taking place in our global culture that serves as an expression of a mood and an attitude."
        Which is neither here nor there. As visualizationists, we want to ensure our colors make sense across a wide variety of media
        <div className="app-content">
          <div className="color-blocks-wrapper">
          {colors.map(this.renderColorWithName)}
          </div>
          <HSLGraph
            setProperty={this.setProperty}
            hoveredRow={this.state.hoveredRow}/>
          <ColorChannelGraph
            setProperty={this.setProperty}
            hoveredRow={this.state.hoveredRow}/>
        </div>
      </div>);
  }
});
