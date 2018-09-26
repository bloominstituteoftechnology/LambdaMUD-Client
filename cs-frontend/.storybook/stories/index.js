import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import Button from '../components/Button';
import BarChart from '../../src/Components/Charts/BarChart';
import Donut from '../../src/Components/Charts/Donut';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  object
} from '@storybook/addon-knobs';

import { Doughnut, Bar } from 'react-chartjs-2';

const stories = storiesOf('Storybook Knobs', module);
stories.addDecorator(withKnobs);

const barOps = {
  series: [[96], [110]],
  labels: ['2017', '2018']
};
stories.add('bar1', () => (
  <BarChart barOptions={object('defaultOps', barOps)} counter={1} />
));

const barOps2 = {
  series: [[10, 100], [100, 50], [25, 75]],
  labels: ['fy1', 'fy2', 'fy3'],
  options: [
    'screen and (min-width: 1000px)',
    {
      stackBars: false,
      reverseData: false,
      horizontalBars: false,
      seriesBarDistance: 7
    }
  ],
  classname: 'ct-golden-section'
};

stories.add('barCustom', () => (
  <BarChart barOptions={object('customOps', barOps2)} counter={1} />
));

/////
stories.add('DonutChart', () => (
  <Donut completionPct={number(80)} counter={3} />
));

var data = {
  labels: ['January'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [{ x: 10, y: 20, r: 5 }]
    }
  ]
};

stories.add('chart.js_Doughnut', () => (
  <Doughnut data={object(data.datasets)} key={Math.random()} />
));

const test2 = {
  labels: ['financial', 'IT'],
  datasets: [
    {
      data: [100, 200, 20],
      backgroundColor: ['#f6d155', 'red'],
      borderColor: 'white',
      // hoverBackgroundColor: '#20C80C',
      hoverBackgroundColor: '#0076BF',
      hoverBorderColor: 'white'
    }
  ],
  legend: {
    display: false
  }
};

const test3 = Object.assign({}, test2);
test3.datasets[0].data = [20, 100];

stories.add('chart.jsTest2', () => (
  <div>
    <Doughnut data={test2} />
    <Doughnut data={test3} options={{ legend: { display: false } }} />
  </div>
));

const barData = {
  labels: ['fy2016', 'fy2017', 'fy2018', 'fy2019'],
  datasets: [
    {
      label: 'My data',
      backgroundColor: ' rgba(0, 118, 191, .3)',
      borderColor: 'blue',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 118, 191, .55)',
      hoverBorderColor: 'blue',
      data: [65, 59, 80, 81]
    },
    {
      label: 'Competitor 1',
      backgroundColor: 'rgba(255,99,2,.5)',
      borderColor: 'rgba(255,99,2,.7)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,2,.8)',
      hoverBorderColor: 'rgba(255,99,2,.9)',
      data: [62, 19, 40, 100]
    },
    {
      label: 'Competitor 2',
      backgroundColor: 'rgba(121,180,132,0.5)',
      borderColor: 'rgba(255,2,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(121,180,132,0.9)',
      hoverBorderColor: 'rgba(255,2,132,1)',
      data: [62, 19, 40, 100]
    },
    {
      label: 'Competitor 3',
      backgroundColor: 'rgba(255,99,255,0.2)',
      borderColor: 'rgba(255,99,255,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,255,0.4)',
      hoverBorderColor: 'rgba(255,99,255,1)',
      data: [62, 19, 40, 100]
    }
  ]
};

stories.add('chart.jsBAR', () => (
  <div>
    <Bar data={barData} />
  </div>
));
