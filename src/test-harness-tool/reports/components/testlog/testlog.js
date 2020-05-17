import React, { useRef } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap'
import * as d3 from 'd3';
import styles from './testlog.scss'

function createCasesList(data) {
	return data.map((item, index) => (
		<li key={index}><i style={{backgroundColor:item.color}} />{item.cases}: <span>{item.count}</span></li>
	))
}

const TestLog = (props) => {
  const { testCasesRun, logData } = props
  const expectedDuration = '02:00:00:00'
  const logRef = useRef()
  const drawLog = () => {
	const width = 130;
    const height = 130;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(logRef.current)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        
	const casesColor = logData.reduce(function (accumulator, currentValue) {
		return accumulator.concat(currentValue.color)
	}, [])
	
    const color = d3.scaleOrdinal(casesColor);

    const pie = d3.pie()
        .value(d => d.percent)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius-10);
		
	function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }
	
	const arcs = svg.selectAll("g.arc")
    .data(pie(logData))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    // Join new data
	const path = arcs.selectAll("path")
		.data(pie(logData));

	// Update existing arcs
	path.transition().duration(200).attrTween("d", arcTween);

	// Enter new arcs
	arcs.append("path")
		.attr("fill", (d, i) => color(i))
		.attr("d", arc)
		.attr("stroke", "white")
		.attr("stroke-width", "6px")
		.each(function(d) { this._current = d; });
	
	arcs
		.append('text')
	    .attr("transform", function (d) {
			const _d = arc.centroid(d);
			_d[0] *= 2.2;	
			_d[1] *= 2.2;	
			return "translate(" + _d + ")";
	    })
		.attr("dy", ".10rem")
	    .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '0.8rem')
		.text(function (d) {
          return d.data.percent + "%";
		})
}
	setTimeout(() => {
		drawLog()
	},10)
	
  return (
    <div>
	  <div className={styles.logContainer}>
		<div className={styles.logWrapper} ref={logRef} />
		<div className={styles.logLables}>
		  <ul className={styles.padBottom}>
			<li><i />Test Cases Run: <span>{testCasesRun}</span></li>
			{createCasesList(logData)}
		  </ul>
		  <div>Execution duration: <span>{expectedDuration}</span></div>
		</div>
	  </div>
	</div>
  );
}

export default TestLog;
