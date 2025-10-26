import { useState } from "react";
import { type AlgorithmType, type DatasetType } from "@shared/schema";
import { Header } from "@/components/Header";
import { AlgorithmSelector } from "@/components/AlgorithmSelector";
import { BenchmarkControls } from "@/components/BenchmarkControls";
import { BenchmarkChart } from "@/components/BenchmarkChart";
import { BenchmarkResults } from "@/components/BenchmarkResults";
import { AlgorithmDetails } from "@/components/AlgorithmDetails";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface BenchmarkDataPoint {
  algorithmId: AlgorithmType;
  datasetSize: number;
  executionTime: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmType[]>([]);
  const [datasetSize, setDatasetSize] = useState(1000);
  const [datasetType, setDatasetType] = useState<DatasetType>("random");
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkDataPoint[]>([]);

  const toggleAlgorithm = (algorithmId: AlgorithmType) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithmId)
        ? prev.filter((id) => id !== algorithmId)
        : [...prev, algorithmId]
    );
  };

  const runBenchmarkMutation = useMutation({
    mutationFn: async () => {
      const sizes = generateDatasetSizes(datasetSize);
      
      const response = await apiRequest(
        "POST",
        "/api/benchmark",
        {
          algorithms: selectedAlgorithms,
          datasetSizes: sizes,
          datasetType,
        }
      );
      const data = await response.json();
      return data as { results: BenchmarkDataPoint[] };
    },
    onSuccess: (data) => {
      setBenchmarkResults(data.results);
      
      toast({
        title: "Benchmark Complete",
        description: `Successfully benchmarked ${selectedAlgorithms.length} algorithm(s) across multiple dataset sizes`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Benchmark Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateDatasetSizes = (maxSize: number): number[] => {
    const sizes: number[] = [];
    const steps = 5;
    
    if (maxSize <= 500) {
      for (let i = 1; i <= steps; i++) {
        sizes.push(Math.floor((maxSize / steps) * i));
      }
    } else {
      const step = maxSize / steps;
      for (let i = 1; i <= steps; i++) {
        sizes.push(Math.floor(step * i));
      }
    }
    
    return sizes;
  };

  const handleRunBenchmark = () => {
    if (selectedAlgorithms.length === 0) {
      toast({
        title: "No algorithms selected",
        description: "Please select at least one algorithm to benchmark",
        variant: "destructive",
      });
      return;
    }
    runBenchmarkMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className="mb-8 lg:mb-0" data-testid="sidebar-controls">
            <div className="lg:sticky lg:top-24 space-y-6">
              <AlgorithmSelector
                selectedAlgorithms={selectedAlgorithms}
                onToggleAlgorithm={toggleAlgorithm}
              />
              
              <BenchmarkControls
                datasetSize={datasetSize}
                onDatasetSizeChange={setDatasetSize}
                datasetType={datasetType}
                onDatasetTypeChange={setDatasetType}
                onRunBenchmark={handleRunBenchmark}
                isRunning={runBenchmarkMutation.isPending}
                canRun={selectedAlgorithms.length > 0}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            <BenchmarkResults
              results={benchmarkResults}
              datasetSize={datasetSize}
            />
            
            <BenchmarkChart results={benchmarkResults} />
            
            <AlgorithmDetails selectedAlgorithms={selectedAlgorithms} />
          </div>
        </div>
      </main>
    </div>
  );
}
