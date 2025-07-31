import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

type Props = {
  data: [number, number | null][];
};

export default function SingleSeriesChart({ data }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      setDimensions({ width, height: width * 0.6 });
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const filtered = data.filter(([, v]) => v !== null) as [number, number][];
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain(d3.extent(filtered, d => d[0]) as [number, number]).range([0, innerWidth]);
    const y = d3.scaleLinear().domain(d3.extent(filtered, d => d[1]) as [number, number]).nice().range([innerHeight, 0]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    g.append("g")
      .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(() => ""))
      .attr("stroke-opacity", 0.1);

    const line = d3.line<[number, number | null]>()
      .defined(d => d[1] !== null)
      .x(d => x(d[0]))
      .y(d => y(d[1]!));

    g.append("path")
      .datum(filtered)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2.5)
      .attr("d", line);

  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-auto">
      <svg ref={svgRef} className="block w-full h-auto" />
    </div>
  );
}
