import { algorithmsMetadata, type BenchmarkDataPoint } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock } from "lucide-react";

interface BenchmarkResultsProps {
  results: BenchmarkDataPoint[];
  datasetSize: number;
}

export function BenchmarkResults({ results, datasetSize }: BenchmarkResultsProps) {
  if (results.length === 0) {
    return null;
  }

  const latestResults = results.filter((r) => r.datasetSize === datasetSize);
  
  if (latestResults.length === 0) {
    return null;
  }

  const sortedResults = [...latestResults].sort(
    (a, b) => a.executionTime - b.executionTime
  );

  const formatTime = (time: number) => {
    if (time < 1) return `${time.toFixed(3)} ms`;
    if (time < 1000) return `${time.toFixed(2)} ms`;
    return `${(time / 1000).toFixed(2)} s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-4" data-testid="component-benchmark-results">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Latest Results</h3>
        <span className="text-sm text-muted-foreground">
          ({formatNumber(datasetSize)} elements)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedResults.map((result, index) => {
          const algorithm = algorithmsMetadata[result.algorithmId];
          const isFastest = index === 0;

          return (
            <Card
              key={result.algorithmId}
              className={`p-6 ${isFastest ? "ring-2 ring-primary" : ""}`}
              data-testid={`card-result-${result.algorithmId}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-lg font-medium" data-testid={`text-algorithm-name-${result.algorithmId}`}>
                    {algorithm.name}
                  </h4>
                  {isFastest && (
                    <Trophy className="h-5 w-5 text-primary flex-shrink-0" data-testid="icon-fastest" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary" data-testid={`text-execution-time-${result.algorithmId}`}>
                    {formatTime(result.executionTime)}
                  </p>
                  <p className="text-sm text-muted-foreground">Execution Time</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs font-mono">
                    Avg: {algorithm.timeComplexity.average}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono">
                    Space: {algorithm.spaceComplexity}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
