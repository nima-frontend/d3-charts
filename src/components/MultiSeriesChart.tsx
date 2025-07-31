import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

type Props = {
  data: [number, (number | null)[]][];
};

const COLORS = ["blue", "green", "red"];

export default function MultiSeriesChart({ data }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      setDimensions({ width, height: width * 0.6 });
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    const seriesCount = 3;
    const allSeries = Array.from({ length: seriesCount }, (_, i) =>
      data.map(([t, vals]) => [t, vals[i]] as [number, number | null])
    );

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d[0]) as [number, number])
      .range([0, innerWidth]);

    const allYValues = allSeries
      .flat()
      .filter(([, v]) => v !== null)
      .map(([, v]) => v!);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(allYValues) as [number, number])
      .nice()
      .range([innerHeight, 0]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Y Axis
    g.append("g").call(d3.axisLeft(y));

    // Gridlines
    g.append("g")
      .call(
        d3.axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => "")
      )
      .attr("stroke-opacity", 0.1);

    // dots per series
    allSeries.forEach((series, i) => {
      g.selectAll(`circle.series-${i}`)
        .data(series.filter(([, v]) => v !== null))
        .enter()
        .append("circle")
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]!))
        .attr("r", 4)
        .attr("fill", COLORS[i])
        .attr("opacity", 0.8);
    });

  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-auto">
      <svg ref={svgRef} className="block w-full h-auto" />
    </div>
  );
}
