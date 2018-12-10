import React from 'react';

import {colors, BASEBALL_WINS, GROUNDHOG, presidentialData, NUM_YEARS} from '../constants';

import {XYPlot, PolygonSeries, YAxis, XAxis} from 'react-vis';

const colorHash = colors.reduce((res, clr) => {
  res[clr.year] = clr;
  return res;
}, {});

const colorData = colors.map(({year, color, colorName}) => ({
  y0: year,
  y: year + 1,
  color,
  label: colorName,
  style: {color: 'red'}
}));

const groundhogData = GROUNDHOG.map(({year, forecast}) => ({
  y0: year,
  y: year + 1,
  color: forecast === 'Shadow' ? '#000' : '#fff'
}));

const baseballData = BASEBALL_WINS.map(({leagueWin, year}) => ({
  y0: year,
  y: year + 1,
  color: leagueWin === 'AL' ? '#3cc' : '#ff3'
}));

const leapYears = [...new Array(NUM_YEARS)].map((year, index) => ({
  y0: index + 2000,
  y: index + 2001,
  color: (index % 4 === 0) ? '#000' : '#fff'
}));

let currentSum = 0;
const DATASETS = [{
  data: colorData, title: 'PANTONE COLOR', width: 1.0
}, {
  data: groundhogData, title: 'GROUNDHOG PREDICTION', subtitle: 'BLACK FOR 4 MORE WEEKS OF WINTER'
}, {
  data: leapYears, title: 'LEAP YEARS', subtitle: 'BONUS DAY YEARS IN BLACK'
}, {
  data: baseballData, title: 'MLB LEAGURE WINNER', subtitle: 'AL IN BLUE & NL IN YELLOW'
}, {
  data: presidentialData, title: 'PRESIDENTIAL PARTY', subtitle: 'DEMS IN BLUE & REPUBS IN RED'
}].map(row => {
  const newRow = {...row, leftEdge: currentSum};
  if (!newRow.width) {
    newRow.width = 0.5;
  }
  currentSum += newRow.width;
  return newRow;
});

const cells = DATASETS.reduce((acc, row) => {
  const {width, leftEdge, data} = row;
  return acc.concat(data.map(({y, y0, color}) => {
    return {
      data: [
        {x: leftEdge, y},
        {x: leftEdge, y: y0},
        {x: leftEdge + width, y: y0},
        {x: leftEdge + width, y}
      ],
      color
    };
  }));
}, []);

const sectionMap = DATASETS.reduce((res, {title, subtitle, leftEdge}, index) => {
  res[leftEdge] = title;
  if (subtitle) {
    res[leftEdge + 0.1] = subtitle;
  }
  return res;
}, {});

class ColorTimeline extends React.Component {
  render() {
    return (
      <div className="timeline-wrapper">
        <XYPlot
          className="color-timeline"
          margin={{left: 50, right: 100, top: 150, bottom: 100}}
          xDomain={[0, currentSum]}
          yDomain={[2000 + NUM_YEARS, 2000]}
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
          {cells.map(({data, color}, index) => (
            <PolygonSeries data={data} color={color} key={`${index}-${color}`}/>
          ))}
        </XYPlot>
      </div>
    );
  }
}

ColorTimeline.display = 'ColorTimeline';
export default ColorTimeline;
