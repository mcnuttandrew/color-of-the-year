import React from 'react';
// import HSLGraph from './hsl-channel';
import ColorTypeSunburst from './color-type-sunburst';
import ColorTimeline from './color-timeline';
import {OPENING_COMMENT, NEXT_COMMENT, FINAL_COMMENT} from '../constants';

class RootComponent extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="project-name">
          <div className="title">PANTONE</div>
          <div className="subtitle">Color of the year </div>
          <div className="authorship">
            By <a href="http://www.mcnutt.in/">Andrew McNutt</a>
          </div>
        </div>
        <div className="text">{OPENING_COMMENT}</div>
        <div className="circles-container">
          <ColorTypeSunburst useRGB />
          <ColorTypeSunburst />
        </div>
        <div className="text">{NEXT_COMMENT}</div>
        <ColorTimeline />
        <div className="text">{FINAL_COMMENT}</div>
      </div>);
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
