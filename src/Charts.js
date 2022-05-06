
/** MultilineChart.js */
import {useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import "./App.css"


export const MultilineChart = ({ data, dimensions }) => {
  const svgRef = useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
 

  

  useEffect(() => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].items, (d) => d.date))
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([
        d3.min(data[0].items, (d) => d.value) - 50,
        d3.max(data[0].items, (d) => d.value) + 50
      ])
      .range([height, 0]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale)
     .ticks(5)
     .tickSize(-height + margin.bottom);
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height - margin.bottom})`)
     .call(xAxis);
   xAxisGroup.select(".domain").remove();
   xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
   xAxisGroup.selectAll("text")
     .attr("opacity", 0.5)
     .attr("color", "white")
     .attr("font-size", "0.75rem");
   // Add Y grid lines with labels
   const yAxis = d3.axisLeft(yScale)
     .ticks(5)
     .tickSize(-width)
     .tickFormat((val) => `${val}%`);
   const yAxisGroup = svg.append("g").call(yAxis);
   yAxisGroup.select(".domain").remove();
   yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
   yAxisGroup.selectAll("text")
     .attr("opacity", 0.5)
     .attr("color", "white")
     .attr("font-size", "0.75rem");
    // Draw the lines
    const line = d3.line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));
    svg.selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 3)
      .attr("d", (d) => line(d.items));
  }, [data]); // Redraw chart if data changes
 
  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
 
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/line-with-missing-data
export const LineChart = ({
  data,
  dimensions,
  // x = ([x]) => x, // given d in data, returns the (temporal) x-value
  // y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points
  xType = d3.scaleTime, // the x-scale type
  xDomain, // [xmin, xmax]
  yType = d3.scaleLinear, // the y-scale type
  yDomain, // [ymin, ymax]
  color = "currentColor", // stroke color of line
  strokeLinecap = "round", // stroke line cap of the line
  strokeLinejoin = "round", // stroke line join of the line
  strokeWidth = 2, // stroke width of line, in pixels
  strokeOpacity = 1, // stroke opacity of line
  yFormat, // a format specifier string for the y-axis
  yLabel // a label for the y-axis
}) => {

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const xRange = [margin.left, width - margin.right]; // [left, right]
  const yRange = [height - margin.bottom, margin.top]; // [bottom, top]


  console.log(data);
  
  const svgRef = useRef(null);

  useEffect(() => {
      // Compute values.

  const X = d3.map(data, d => new Date(d.time));
  const Y = d3.map(data, d => d.temperature);
  const I = d3.map(data, (_, i) => i);
  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  // Compute default domains.
  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0)
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Construct a line generator.
  const line = d3.line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  const svgEl = d3.select(svgRef.current);
  svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
  const svg = svgEl
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("d", line(I.filter(i => D[i])));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(I));
  
    
    }, [data]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}




export default MultilineChart;