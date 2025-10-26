import { type DatasetType } from "@shared/schema";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

interface BenchmarkControlsProps {
  datasetSize: number;
  onDatasetSizeChange: (size: number) => void;
  datasetType: DatasetType;
  onDatasetTypeChange: (type: DatasetType) => void;
  onRunBenchmark: () => void;
  isRunning: boolean;
  canRun: boolean;
}

export function BenchmarkControls({
  datasetSize,
  onDatasetSizeChange,
  datasetType,
  onDatasetTypeChange,
  onRunBenchmark,
  isRunning,
  canRun,
}: BenchmarkControlsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-6 pt-4 border-t" data-testid="component-benchmark-controls">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="dataset-size" className="text-sm font-medium">
            Dataset Size
          </Label>
          <span className="text-sm font-mono text-muted-foreground" data-testid="text-dataset-size">
            {formatNumber(datasetSize)}
          </span>
        </div>
        <Slider
          id="dataset-size"
          min={100}
          max={100000}
          step={100}
          value={[datasetSize]}
          onValueChange={(value) => onDatasetSizeChange(value[0])}
          data-testid="slider-dataset-size"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>100</span>
          <span>100,000</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Dataset Type</Label>
        <RadioGroup
          value={datasetType}
          onValueChange={(value) => onDatasetTypeChange(value as DatasetType)}
          data-testid="radiogroup-dataset-type"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="random" id="random" data-testid="radio-dataset-random" />
            <Label htmlFor="random" className="text-sm cursor-pointer">
              Random
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sorted" id="sorted" data-testid="radio-dataset-sorted" />
            <Label htmlFor="sorted" className="text-sm cursor-pointer">
              Sorted
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reverse" id="reverse" data-testid="radio-dataset-reverse" />
            <Label htmlFor="reverse" className="text-sm cursor-pointer">
              Reverse Sorted
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        onClick={onRunBenchmark}
        disabled={!canRun || isRunning}
        className="w-full h-12 text-base"
        data-testid="button-run-benchmark"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Running Benchmark...
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Run Benchmark
          </>
        )}
      </Button>
    </div>
  );
}
