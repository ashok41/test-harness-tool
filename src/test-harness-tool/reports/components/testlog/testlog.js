import React, { useRef } from 'react';
import * as d3 from 'd3';
import styles from './testlog.scss'

const TestLog = () => {
  const logRef = useRef()
  const drawLog = () => {
	const logData = [
		{ "region": "North", "count": "53245"},
		{ "region": "South", "count": "28479"},
		{ "region": "East", "count": "19697"},
	]
	const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(logRef.current)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#66c2a5","#fc8d62","#8da0cb",
         "#e78ac3","#a6d854","#ffd92f"]);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }

    // Join new data
	const path = svg.selectAll("path")
		.data(pie(logData));

	// Update existing arcs
	path.transition().duration(200).attrTween("d", arcTween);

	// Enter new arcs
	path.enter().append("path")
		.attr("fill", (d, i) => color(i))
		.attr("d", arc)
		.attr("stroke", "white")
		.attr("stroke-width", "6px")
		.each(function(d) { this._current = d; });
}
	setTimeout(() => {
		drawLog()
	},10)
  return (
    <div>
      <div className={styles.logWrapper} ref={logRef} />
	  <div>TestLog_Javascript</div>
	</div>
  );
}

export default TestLog;
