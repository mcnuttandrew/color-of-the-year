import React from 'react';
import HSLGraph from './hsl-channel';
import ColorTypeSunburst from './color-type-sunburst';
import ColorTimeline from './color-timeline';
import {OPENING_COMMENT, NEXT_COMMENT} from '../constants';

class RootComponent extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="project-name">
          <div className="title">PANTONE</div>
          <div className="subtitle">Color of the year </div>
        </div>
        <div>{OPENING_COMMENT}</div>
        <div className="app-content">
          <div className="circles-container">
            <HSLGraph />
            <ColorTypeSunburst />
          </div>
          <div>{NEXT_COMMENT}</div>
          <ColorTimeline />
        </div>
      </div>);
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
