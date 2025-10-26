import { algorithmsMetadata, type AlgorithmType, type AlgorithmCategory } from "@shared/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface AlgorithmSelectorProps {
  selectedAlgorithms: AlgorithmType[];
  onToggleAlgorithm: (algorithmId: AlgorithmType) => void;
}

export function AlgorithmSelector({
  selectedAlgorithms,
  onToggleAlgorithm,
}: AlgorithmSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<AlgorithmCategory>>(
    new Set<AlgorithmCategory>(["sorting", "search"])
  );

  const toggleCategory = (category: AlgorithmCategory) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(category)) {
        newExpanded.delete(category);
      } else {
        newExpanded.add(category);
      }
      return newExpanded;
    });
  };

  const algorithmsByCategory = Object.values(algorithmsMetadata).reduce(
    (acc, algo) => {
      if (!acc[algo.category]) {
        acc[algo.category] = [];
      }
      acc[algo.category].push(algo);
      return acc;
    },
    {} as Record<AlgorithmCategory, typeof algorithmsMetadata[AlgorithmType][]>
  );

  const categoryLabels: Record<AlgorithmCategory, string> = {
    sorting: "Sorting Algorithms",
    search: "Search Algorithms",
  };

  return (
    <div className="space-y-4" data-testid="component-algorithm-selector">
      <h2 className="text-lg font-semibold">Select Algorithms</h2>
      
      {Object.entries(algorithmsByCategory).map(([category, algorithms]) => {
        const isExpanded = expandedCategories.has(category as AlgorithmCategory);
        
        return (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category as AlgorithmCategory)}
              className="flex items-center gap-2 w-full text-sm font-medium hover-elevate active-elevate-2 rounded-md px-2 py-1 -mx-2"
              data-testid={`button-toggle-category-${category}`}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {categoryLabels[category as AlgorithmCategory]}
            </button>

            {isExpanded && (
              <div className="space-y-1 pl-2">
                {algorithms.map((algo) => {
                  const isSelected = selectedAlgorithms.includes(algo.id);
                  
                  return (
                    <div
                      key={algo.id}
                      className={`flex items-center gap-3 h-11 px-3 rounded-md hover-elevate active-elevate-2 ${
                        isSelected ? "border-l-2 border-l-primary" : ""
                      }`}
                      data-testid={`container-algorithm-${algo.id}`}
                    >
                      <Checkbox
                        id={algo.id}
                        checked={isSelected}
                        onCheckedChange={() => onToggleAlgorithm(algo.id)}
                        data-testid={`checkbox-algorithm-${algo.id}`}
                      />
                      <Label
                        htmlFor={algo.id}
                        className="flex-1 cursor-pointer text-sm font-medium"
                        data-testid={`label-algorithm-${algo.id}`}
                      >
                        {algo.name}
                      </Label>
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono"
                        data-testid={`badge-complexity-${algo.id}`}
                      >
                        {algo.timeComplexity.average}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
