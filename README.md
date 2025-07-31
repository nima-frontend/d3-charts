# React + D3 Dynamic Multi-Series & Single-Series Chart Dashboard

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript) ![D3.js](https://img.shields.io/badge/D3.js-7.9.0-orange?logo=d3.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-blue?logo=tailwindcss)

A modern, responsive React dashboard that loads chart data dynamically and visualizes single-series and multi-series time series data using **D3.js** with TypeScript. Supports skipping null values, adaptive axis scaling, and a dark glassmorphism design with responsive layouts.

---

## Features

- **Dynamic data loading** from JSON files (`data.json` and `dataMinimal.json`).
- Auto-detection of chart type: single-series or multi-series based on data structure.
- **Single-Series Chart:**
  - Continuous line chart with gaps skipped for null values.
- **Multi-Series Chart:**
  - Three overlaid series with distinct colors (Blue, Green, Red).
  - Each series handles nulls independently.
  - Scales axes dynamically based on actual data ranges with padding for clarity.
- Fully **responsive SVG charts** that adapt to container size.
- Modern dark theme with glassmorphism effects using Tailwind CSS.
- Modular React components with clean TypeScript typings.
- Graceful error handling for data loading.
- Separate sections for main data and minimal example charts.

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/react-d3-chart-dashboard.git
cd react-d3-chart-dashboard
```
2. **Install Dependencies**

```bash
pnpm install
```
3. **Run The Development server**
```bash
pnpm run dev
```



