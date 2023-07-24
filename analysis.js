// analysis.js

// Sample data (Replace with your dataset)
const data = [
  { x: 'Category 1', y: 10 },
  { x: 'Category 2', y: 25 },
  { x: 'Category 3', y: 15 },
  { x: 'Category 4', y: 30 },
];

// Data analysis and visualization
const svg = d3.select('#visualization')
  .append('svg')
  .attr('width', 500)
  .attr('height', 300);

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .domain(data.map(d => d.x));

const y = d3.scaleLinear()
  .rangeRound([height, 0])
  .domain([0, d3.max(data, d => d.y)]);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

g.append('g')
  .attr('class', 'axis axis-x')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x));

g.append('g')
  .attr('class', 'axis axis-y')
  .call(d3.axisLeft(y).ticks(10, 's'))
  .append('text')
  .attr('x', 2)
  .attr('y', y(y.ticks(10).pop()))
  .attr('dy', '0.35em')
  .attr('text-anchor', 'start')
  .text('Value');

g.selectAll('.bar')
  .data(data)
  .enter().append('rect')
  .attr('class', 'bar')
  .attr('x', d => x(d.x))
  .attr('y', d => y(d.y))
  .attr('width', x.bandwidth())
  .attr('height', d => height - y(d.y));
