import { algorithmsMetadata, type BenchmarkDataPoint, type AlgorithmType } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

interface BenchmarkChartProps {
  results: BenchmarkDataPoint[];
}

const algorithmColors: Record<AlgorithmType, string> = {
  bubbleSort: "hsl(var(--chart-1))",
  quickSort: "hsl(var(--chart-2))",
  mergeSort: "hsl(var(--chart-3))",
  insertionSort: "hsl(var(--chart-4))",
  linearSearch: "hsl(var(--chart-5))",
  binarySearch: "hsl(var(--chart-1))",
};

export function BenchmarkChart({ results }: BenchmarkChartProps) {
  if (results.length === 0) {
    return (
      <Card className="p-8 min-h-96 flex items-center justify-center" data-testid="component-empty-chart">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-muted-foreground">No benchmark results yet</p>
          <p className="text-sm text-muted-foreground">
            Select algorithms and run a benchmark to see performance comparison
          </p>
        </div>
      </Card>
    );
  }

  const groupedBySize = results.reduce((acc, point) => {
    if (!acc[point.datasetSize]) {
      acc[point.datasetSize] = { size: point.datasetSize };
    }
    acc[point.datasetSize][point.algorithmId] = point.executionTime;
    return acc;
  }, {} as Record<number, any>);

  const chartData = Object.values(groupedBySize).sort((a, b) => a.size - b.size);

  const uniqueAlgorithms = Array.from(
    new Set(results.map((r) => r.algorithmId))
  );

  const formatTime = (time: number) => {
    if (time < 1) return `${time.toFixed(3)} ms`;
    if (time < 1000) return `${time.toFixed(2)} ms`;
    return `${(time / 1000).toFixed(2)} s`;
  };

  const formatSize = (size: number) => {
    if (size >= 1000) return `${(size / 1000).toFixed(0)}k`;
    return size.toString();
  };

  return (
    <Card className="p-6" data-testid="component-benchmark-chart">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Performance Comparison</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Execution time vs. dataset size
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="size"
            tickFormatter={formatSize}
            label={{ value: 'Dataset Size', position: 'insideBottom', offset: -5 }}
            className="text-xs"
          />
          <YAxis
            tickFormatter={formatTime}
            label={{ value: 'Execution Time', angle: -90, position: 'insideLeft' }}
            className="text-xs"
          />
          <Tooltip
            formatter={(value: number) => formatTime(value)}
            labelFormatter={(label) => `Size: ${formatSize(label)}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => algorithmsMetadata[value as AlgorithmType]?.name || value}
          />
          {uniqueAlgorithms.map((algorithmId) => (
            <Line
              key={algorithmId}
              type="monotone"
              dataKey={algorithmId}
              stroke={algorithmColors[algorithmId]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={algorithmId}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
