import { useEffect, useState } from "react";
import type { ChartData } from "./types";
import ChartRenderer from "./components/ChartRenderer";

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [minimalCharts, setMinimalCharts] = useState<ChartData[]>([]);

  // Titles for the main charts
  const titles = [
    { id: 1, title: "Single-Series Chart" },
    { id: 2, title: "Multi-Series Chart" },
  ];

  // Titles for the minimal example charts
  const minimalTitles = [
    { id: 1, title: "Single Series Example (Minimal)" },
    { id: 2, title: "Multi Series Example (Minimal)" },
  ];

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setCharts)
      .catch((err) => console.error("Failed to load data.json", err));

    fetch("/dataMinimal.json")
      .then((res) => res.json())
      .then(setMinimalCharts)
      .catch((err) => console.error("Failed to load dataMinimal.json", err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-zinc-900 text-white">
      {/* Minimal example charts */}
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Minimal Example Charts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {minimalCharts.map((chart, idx) => (
          <div
            key={"minimal-" + idx}
            className="bg-zinc-800/40 border border-zinc-700 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all"
          >
            <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
            <ChartRenderer
              chart={chart}
              chartTitle={minimalTitles[idx]?.title ?? "Untitled"}
            />
          </div>
        ))}
      </div>
      
      <h1 className="text-2xl font-bold mt-10 text-center text-white">
       Heavy provided Charts
      </h1>
            {/* Original charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {charts.map((chart, idx) => (
          <div
            key={"main-" + idx}
            className="bg-zinc-800/40 border border-zinc-700 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
          >
            <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
            <ChartRenderer
              chart={chart}
              chartTitle={titles[idx]?.title ?? "Untitled"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
