import type { ChartData } from "../types";
import SingleSeriesChart from "./SingleSeriesChart";
import MultiSeriesChart from "./MultiSeriesChart";

type Props = { 
    chart: ChartData
    chartTitle:string
};


export default function ChartRenderer({ chart,chartTitle }: Props) {
  const firstValue = chart.data[0]?.[1];
  const isMulti = Array.isArray(firstValue);
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{chartTitle}</h2>
      {isMulti ? (
        <MultiSeriesChart data={chart.data as [number, (number | null)[]][]} />
      ) : (
        <SingleSeriesChart data={chart.data as [number, number | null][]} />
      )}
    </div>
  );
}
