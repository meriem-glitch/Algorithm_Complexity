import { z } from "zod";

// Algorithm categories and types
export const algorithmCategories = ["sorting", "search"] as const;
export const algorithmTypes = [
  "bubbleSort",
  "quickSort",
  "mergeSort",
  "insertionSort",
  "linearSearch",
  "binarySearch",
] as const;

export const datasetTypes = ["random", "sorted", "reverse"] as const;

export type AlgorithmCategory = typeof algorithmCategories[number];
export type AlgorithmType = typeof algorithmTypes[number];
export type DatasetType = typeof datasetTypes[number];

// Algorithm metadata interface
export interface AlgorithmMetadata {
  id: AlgorithmType;
  name: string;
  category: AlgorithmCategory;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  explanation: string;
  whenToUse: string;
}

// Benchmark configuration schema
export const benchmarkConfigSchema = z.object({
  algorithms: z.array(z.enum(algorithmTypes)).min(1, "Select at least one algorithm"),
  datasetSizes: z.array(z.number().int().positive()).min(1),
  datasetType: z.enum(datasetTypes),
});

export type BenchmarkConfig = z.infer<typeof benchmarkConfigSchema>;

// Single benchmark result for one algorithm at one size
export interface BenchmarkDataPoint {
  algorithmId: AlgorithmType;
  datasetSize: number;
  executionTime: number; // milliseconds
}

// Complete benchmark results
export interface BenchmarkResults {
  config: BenchmarkConfig;
  results: BenchmarkDataPoint[];
  timestamp: number;
}

// Algorithm metadata database
export const algorithmsMetadata: Record<AlgorithmType, AlgorithmMetadata> = {
  bubbleSort: {
    id: "bubbleSort",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    description: "Simple comparison-based sorting algorithm that repeatedly steps through the list.",
    explanation: "Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. Each pass through the array bubbles the largest unsorted element to its correct position.",
    whenToUse: "Best for small datasets or nearly sorted data. Educational purposes to understand basic sorting concepts. Not recommended for production use with large datasets.",
  },
  quickSort: {
    id: "quickSort",
    name: "Quick Sort",
    category: "sorting",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    description: "Efficient divide-and-conquer sorting algorithm using a pivot element.",
    explanation: "Quick Sort selects a pivot element and partitions the array so that elements smaller than the pivot come before it, and larger elements come after. It then recursively sorts the sub-arrays.",
    whenToUse: "Excellent general-purpose sorting algorithm. Great for large datasets with random distribution. Most efficient in-place sorting algorithm on average.",
  },
  mergeSort: {
    id: "mergeSort",
    name: "Merge Sort",
    category: "sorting",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    description: "Stable divide-and-conquer algorithm with guaranteed O(n log n) performance.",
    explanation: "Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves back together. It guarantees consistent performance regardless of input.",
    whenToUse: "When you need guaranteed O(n log n) performance and stability (preserving order of equal elements). Ideal for linked lists and external sorting.",
  },
  insertionSort: {
    id: "insertionSort",
    name: "Insertion Sort",
    category: "sorting",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    description: "Simple sorting algorithm that builds the final sorted array one item at a time.",
    explanation: "Insertion Sort works like sorting playing cards. It takes each element and inserts it into its correct position among the already sorted elements.",
    whenToUse: "Excellent for small datasets or nearly sorted data. Very efficient when data is almost sorted. Often used as the final step in hybrid sorting algorithms.",
  },
  linearSearch: {
    id: "linearSearch",
    name: "Linear Search",
    category: "search",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    description: "Sequential search algorithm that checks each element until the target is found.",
    explanation: "Linear Search examines each element in the array one by one from start to finish until it finds the target value or reaches the end of the array.",
    whenToUse: "Use for unsorted data or small datasets. Only option when data cannot be sorted. Simple to implement and works on any data structure.",
  },
  binarySearch: {
    id: "binarySearch",
    name: "Binary Search",
    category: "search",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    description: "Efficient search algorithm for sorted arrays using divide-and-conquer.",
    explanation: "Binary Search repeatedly divides the search interval in half. It compares the target with the middle element and eliminates half of the remaining elements based on the comparison.",
    whenToUse: "Requires sorted data. Extremely efficient for large sorted datasets. Standard choice for search operations in sorted collections.",
  },
};
