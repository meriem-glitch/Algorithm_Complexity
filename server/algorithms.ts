import { type DatasetType } from "@shared/schema";

// Sorting Algorithms

export function bubbleSort(arr: number[]): void {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

export function quickSort(arr: number[], left = 0, right = arr.length - 1): void {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

export function mergeSort(arr: number[]): void {
  if (arr.length <= 1) return;
  mergeSortHelper(arr, 0, arr.length - 1);
}

function mergeSortHelper(arr: number[], left: number, right: number): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

function merge(arr: number[], left: number, mid: number, right: number): void {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
  }
  
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
  }
}

export function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
}

// Search Algorithms

export function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Dataset generation

export function generateDataset(size: number, type: DatasetType): number[] {
  const data: number[] = [];
  
  switch (type) {
    case "random":
      for (let i = 0; i < size; i++) {
        data.push(Math.floor(Math.random() * size));
      }
      break;
      
    case "sorted":
      for (let i = 0; i < size; i++) {
        data.push(i);
      }
      break;
      
    case "reverse":
      for (let i = size - 1; i >= 0; i--) {
        data.push(i);
      }
      break;
  }
  
  return data;
}

// Benchmark execution

export type AlgorithmFunction = (arr: number[], ...args: any[]) => void | number;

export const sortingAlgorithms: Record<string, (arr: number[]) => void> = {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
};

export function benchmarkSorting(
  algorithmId: string,
  dataset: number[]
): number {
  const algorithmFn = sortingAlgorithms[algorithmId];
  if (!algorithmFn) {
    throw new Error(`Unknown sorting algorithm: ${algorithmId}`);
  }
  
  const copy = [...dataset];
  const start = performance.now();
  algorithmFn(copy);
  const end = performance.now();
  
  return end - start;
}

export function benchmarkSearch(
  algorithmId: string,
  dataset: number[]
): number {
  let searchFn: (arr: number[], target: number) => number;
  let searchArray = dataset;
  
  if (algorithmId === "linearSearch") {
    searchFn = linearSearch;
  } else if (algorithmId === "binarySearch") {
    searchFn = binarySearch;
    searchArray = [...dataset].sort((a, b) => a - b);
  } else {
    throw new Error(`Unknown search algorithm: ${algorithmId}`);
  }
  
  const target = searchArray[Math.floor(searchArray.length / 2)];
  
  const start = performance.now();
  searchFn(searchArray, target);
  const end = performance.now();
  
  return end - start;
}

export function benchmarkAlgorithm(
  algorithmId: string,
  dataset: number[]
): number {
  if (algorithmId in sortingAlgorithms) {
    return benchmarkSorting(algorithmId, dataset);
  } else if (algorithmId === "linearSearch" || algorithmId === "binarySearch") {
    return benchmarkSearch(algorithmId, dataset);
  } else {
    throw new Error(`Unknown algorithm: ${algorithmId}`);
  }
}
