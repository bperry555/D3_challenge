// @TODO: YOUR CODE HERE!

const svgWidth = 800;
const svgHeight = 500;

d3.select('#scatter') 
  .append('svg')
    .classed('char', true)
    .attr('width', svgWidth)
    .attr('height', svgHeight);

const svg = d3.select('svg');
    
const render = data => {
    
    const margin = {
        top: 30,
        right: 20,
        bottom: 75,
        left: 75
    };
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    
    const title = 'Scatter Plot';

    const xValue = d => d.age;
    const xAxisLabel = 'Age';
    
    const yValue = d => d.smokes;
    const yAxisLabel = 'Smoke';

    const circleRadius = 15;
    

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight])
        .nice();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale);
     
    const yAxis = d3.axisLeft(yScale);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.append('text')
        .classed('axis-label', true)
        .attr('y', 50) 
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const yAxisG = g.append('g').call(yAxis);

    yAxisG.append('text')
        .classed('axis-label', true)
        .attr('y', -50) 
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    

    g.selectAll('circle').data(data)
      .enter().append('circle')
        .classed('stateCircle inactive', true)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);

    g.selectAll('.stateText').data(data)
        .enter().append('text')
        .classed('stateCircle', true)
        .attr('y', d => yScale(yValue(d)) + 5)
        .attr('x', d => xScale(xValue(d)) - 10)
        .text(d => d.abbr)
        .on('click', function(){
            d3.select(this).classed('active', true)
        })


    g.append('text')
        .attr('class', 'title')
        .attr('y', 0)
        .attr('x', innerWidth / 2)
        .attr('text-anchor', 'middle')
        .text(title);
};

d3.csv('/assets/data/data.csv').then(data => {
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
    console.log(data);
    render(data);
});
