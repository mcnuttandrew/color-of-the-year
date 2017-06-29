import React from 'react';

import {colors, BASEBALL_WINS, GROUNDHOG} from '../constants';

import {XYPlot, HorizontalRectSeries, YAxis, XAxis} from 'react-vis';

const colorHash = colors.reduce((res, clr) => {
  res[clr.year] = clr;
  return res;
}, {});

const colorData = colors.map((yearColor) => {
  const {year, color, colorName} = yearColor;
  return {
    y0: year,
    y: year + 1,
    x: 1,
    color,
    label: colorName,
    style: {color: 'red'}
  };
});

const groundhogData = GROUNDHOG.map(hog => {
  const {year, forecast} = hog;
  return {
    y0: year,
    y: year + 1,
    x: 0.5,
    color: forecast === 'Shadow' ? '#000' : '#fff'
  };
});

const presidentialData = [{
  y0: 2000,
  y: 2009,
  x: 0.5,
  color: '#f00'
}, {
  y0: 2009,
  y: 2017,
  x: 0.5,
  color: '#00f'
}, {
  y0: 2017,
  y: 2018,
  x: 0.5,
  color: '#f00'
}];

const baseballData = BASEBALL_WINS.map((winData) => {
  const {leagueWin, year} = winData;
  return {y0: year, y: year + 1, color: leagueWin === 'AL' ? '#3cc' : '#ff3', x: 0.5};
});

const sectionMap = {
  0: 'PANTONE COLOR',
  1: 'GROUNDHOG PREDICTION',
  1.1: 'BLACK FOR 4 MORE WEEKS OF WINTER',
  1.5: 'MLB LEAGURE WINNER',
  1.6: 'AL IN BLUE & NL IN YELLOW',
  2: 'PRESIDENTIAL PARTY',
  2.1: 'DEMS IN BLUE & REPUBS IN RED'
};

class ColorTimeline extends React.Component {
  render() {
    return (
      <XYPlot
        className="color-timeline"
        margin={{left: 50, right: 100, top: 150, bottom: 100}}
        stackBy="x"
        yDomain={[2018, 2000]}
        height={550}
        width={700}>
        <YAxis
          orientation={'left'}
          tickValues={colors.map(clr => (clr.year + 0.5))}
          style={{line: {opacity: 0}}}
          tickFormat={t => t - 0.5}/>
        <YAxis
          orientation={'right'}
          tickValues={colors.map(clr => (clr.year + 0.5))}
          style={{line: {opacity: 0}}}
          tickFormat={t => colorHash[t - 0.5].colorName}/>
        <XAxis
          orientation={'top'}
          tickValues={Object.keys(sectionMap)}
          tickLabelAngle={-40}
          tickFormat={t => sectionMap[t]}
          style={{
            line: {opacity: 0},
            text: {
              textAnchor: 'start'
            }
          }}/>
        <HorizontalRectSeries data={colorData} colorType="literal"/>
        <HorizontalRectSeries data={groundhogData} colorType="literal" />
        <HorizontalRectSeries data={baseballData} colorType="literal"/>
        <HorizontalRectSeries data={presidentialData} colorType="literal" />
      </XYPlot>
    );
  }
}

ColorTimeline.display = 'ColorTimeline';
export default ColorTimeline;
