import { dropdownMenu } from './dropdownMenu.js';
import { scatterPlot } from './scatterplot.js';
// @TODO: YOUR CODE HERE!
const svgWidth = 1140;
const svgHeight = 500;

d3.select('#scatter') 
  .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const svg = d3.select('svg');

let data;
let xColumn;
let yColumn;

const onXColumnClicked = column => {
    xColumn = column;
    render();
};
const onYColumnClicked = column => {
    yColumn = column;
    render();
};

const render = () => {
    
    d3.select('#y-menu')
      .call(dropdownMenu, {
        options: data.columns,
        onSelection: onYColumnClicked,
        selectedOption: yColumn
    });

    d3.select('#x-menu')
      .call(dropdownMenu, {
        options: data.columns,
        onSelection: onXColumnClicked,
        selectedOption: xColumn
    });

    svg.call(scatterPlot, {
        title: 'Scatter Plot',
        xValue: d => d[xColumn],
        xAxisLabel: xColumn,
        yValue: d => d[yColumn],
        yAxisLabel: yColumn,
        circleRadius: 15,
        margin: { top: 30, right: 20, bottom: 75, left: 75 },
        svgWidth,
        svgHeight,
        data
    });

}
d3.csv('/assets/data/data.csv').then(csvData => {
    data = csvData;
    data.forEach(d => {
        // abbr: "AL"
        d.age = +d.age;
        d.ageMoe = +d.ageMoe
        d.healthcare = +d.healthcare;
        d.healthcareHigh= +d.healthcareHigh 
        d.healthcareLow= +d.healthcareLow
        d.id= +d.id
        d.income = +d.income
        d.incomeMoe = +d.incomeMoe
        d.obesity = +d.obesity
        d.obesityHigh = +d.obesityHigh
        d.obesityLow = +d.obesityLow
        d.poverty = +d.poverty
        d.povertyMoe = +d.povertyMoe
        d.smokes= +d.smokes
        d.smokesHigh = +d.smokesHigh
        d.smokesLow = +d.smokesLow
        // state: "Alabama"
        d.healthcare = +d.healthcare;
    })
    xColumn = data.columns[0];
    yColumn = data.columns[0];
    render();
});
