export const scatterPlot = (selection, props) => {
    const {
        title,
        xValue,
        xAxisLabel,
        yValue,
        yAxisLabel,
        circleRadius,
        margin,
        svgWidth,
        svgHeight,
        data
    } = props;

    console.log
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;
 

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = selection.selectAll('.container').data([null])
    const gEnter = g
      .enter().append('g')
        .attr('class', 'container');
    gEnter
      .merge(g)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale);
        // .tickFormat(**)
        // .tickSize(**)
    const yAxis = d3.axisLeft(yScale);
        //   .tickSize(**)

    // const yAxisG = g.select('.y-axis');
    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
      .append('g')
      .attr('class', 'y-axis')
    yAxisG      
      .merge(yAxisGEnter)
          .call(yAxis);
        //   .selectAll('domain').remove()

    const yAxisLabelText = yAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -50) 
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)  
        .text(yAxisLabel);

    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
        .append('g')
          .attr('class', 'x-axis')
        xAxisG
          .merge(xAxisGEnter)
          .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis);
            // .selectAll('domain').remove();
    
    const xAxisLabelText = xAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', 50) 
        .attr('fill', 'black')
      .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);
    
    const circles = g.merge(gEnter).selectAll('circle')
      .data(data)
      .join('circle')
        .attr('class', 'cir')
        .transition().duration(2000)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
    
    const labels = g.merge(gEnter).selectAll('text.label')
            
    .data(data)
    .join('text')  
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .transition().duration(2000) 
    .attr('x', d => xScale(xValue(d)) + 1)
    .attr('y', d => yScale(yValue(d)) + 5)
    .text(d => d.abbr)

    // const label = g.merge(gEnter).selectAll('circle')
    //   .data(data)
    //   .join('text')
    //     .attr('class', 'label')
    //     .transition().duration(2000)
    //     .attr('x', d => xScale(xValue(d)))
    //     .attr('y', d => yScale(yValue(d)))
    //     .text(d => d.abbr);   
    // const labelG = g.select('.label');
    // const labelGEnter = gEnter
    //   .append('g')
    //   .attr('class', 'label')
    //       // .call(LabelText);
    //     //   .selectAll('domain').remove()

    // const LabelText = labelGEnter
    //   .data(data)
    //   .join('text')
    //     .text(d => d.abbr)
    //     .attr('class', 'abbr-label')
    //   .merge(labelG)
    //     .attr('y', d => yScale(yValue(d)))
    //     .attr('x', d => xScale(xValue(d)))
    //     ;
    // const labels = g.merge(gEnter).selectAll('text')
    // .data(data)
    // .join('text')
    // .text(d => d.abbr)
    // labels
    //   .merge(circles)
    //   .transition().duration(2000)
    //   .attr('y', d => yScale(yValue(d)))
    //   .attr('x', d => xScale(xValue(d)));
      
  
    
    
    
        // const labelG = g.select('.label');
    // const labelGEnter = gEnter
    //   .append('g')
    //   .attr('class', 'label')
    //   labelG      
    //     .merge(labelGEnter)
    //       // .call(yAxis);
    

          // const label = g.merge(labelGEnter).selectAll('.label')
    //   .data(data)
    //   .join('text')
    //     .transition().duration(2000)
    //     .attr('y', d => yScale(yValue(d)))
    //     .attr('x', d => xScale(xValue(d)))
    //     .text('hi')

    g.append('text')
      .attr('class', 'title')
      .attr('y', 0)
      .attr('x', innerWidth / 2)
      .attr('text-anchor', 'middle')
      .text(title);
};
