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
  y: 2019,
  x: 0.5,
  color: '#f00'
}];

const baseballData = BASEBALL_WINS.map((winData) => {
  const {leagueWin, year} = winData;
  return {y0: year, y: year + 1, color: leagueWin === 'AL' ? '#3cc' : '#ff3', x: 0.5};
});

const leapYears = [...new Array(18)].map((year, index) => {
  return {
    y0: index + 2000,
    y: index + 2001,
    x: 0.5,
    color: (index % 4 === 0) ? '#000' : '#fff'
  };
});

const filler = [...new Array(19)].map((year, i) => ({y0: i + 2000, y: i + 2001, x: 0.1, color: '#fff'}));

const DATASETS = [
  {data: filler, title: ''},
  {data: colorData, title: 'PANTONE COLOR'},
  {data: groundhogData, title: 'GROUNDHOG PREDICTION', subtitle: 'BLACK FOR 4 MORE WEEKS OF WINTER'},
  {data: leapYears, title: 'LEAP YEARS', subtitle: 'BONUS DAY YEARS IN BLACK'},
  {data: baseballData, title: 'MLB LEAGURE WINNER', subtitle: 'AL IN BLUE & NL IN YELLOW'},
  {data: presidentialData, title: 'PRESIDENTIAL PARTY', subtitle: 'DEMS IN BLUE & REPUBS IN RED'}
];

const sectionMap = DATASETS.reduce((res, set, index) => {
  const {data, title, subtitle} = set;
  const xVal = data[0].x + res.runningValue;
  res[xVal] = title;
  if (subtitle) {
    res[xVal + 0.1] = subtitle;
  }
  res.runningValue = res.runningValue + data[0].x + (index === 0 ? 0.5 : 0);
  return res;
  // magic number of minus for offsetting the pantone correctly
}, {runningValue: -1});

class ColorTimeline extends React.Component {
  render() {
    return (
      <div className="timeline-wrapper">
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
            tickValues={Object.keys(sectionMap).filter(title => title !== 'runningValue')}
            tickLabelAngle={-40}
            tickFormat={t => sectionMap[t]}
            style={{
              line: {opacity: 0},
              text: {
                textAnchor: 'start'
              }
            }}/>
          {DATASETS.map((set, index) => {
            const {data} = set;
            return <HorizontalRectSeries data={data} key={index} colorType="literal"/>;
          })}
        </XYPlot>
      </div>
    );
  }
}

ColorTimeline.display = 'ColorTimeline';
export default ColorTimeline;
