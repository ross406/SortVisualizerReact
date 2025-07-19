import type { AlgorithmInfo, SortingAlgorithm } from "../shared/schema";

export const algorithmData: Record<SortingAlgorithm, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    description: "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    pros: ["Easy to understand", "In-place sorting", "Stable algorithm"],
    cons: ["Poor performance O(n²)", "Not suitable for large datasets"],
    pseudocode: [
      "// Bubble Sort Algorithm",
      "for i = 0 to n-1:",
      "  for j = 0 to n-i-2:",
      "    if arr[j] > arr[j+1]:",
      "      swap(arr[j], arr[j+1])"
    ]
  },
  selection: {
    name: "Selection Sort",
    description: "Selection Sort finds the minimum element from the unsorted portion and places it at the beginning. It maintains two subarrays: sorted and unsorted.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    pros: ["Simple implementation", "In-place sorting", "Minimal swaps"],
    cons: ["Poor performance O(n²)", "Not stable", "Not adaptive"],
    pseudocode: [
      "// Selection Sort Algorithm",
      "for i = 0 to n-1:",
      "  min_idx = i",
      "  for j = i+1 to n:",
      "    if arr[j] < arr[min_idx]:",
      "      min_idx = j",
      "  swap(arr[i], arr[min_idx])"
    ]
  },
  insertion: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position among the previously sorted elements.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    pros: ["Efficient for small datasets", "Adaptive", "Stable", "In-place"],
    cons: ["Inefficient for large datasets", "O(n²) worst case"],
    pseudocode: [
      "// Insertion Sort Algorithm",
      "for i = 1 to n:",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key:",
      "    arr[j+1] = arr[j]",
      "    j = j - 1",
      "  arr[j+1] = key"
    ]
  },
  merge: {
    name: "Merge Sort",
    description: "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them separately, and then merges the sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
    pros: ["Guaranteed O(n log n)", "Stable algorithm", "Predictable performance"],
    cons: ["Requires O(n) extra space", "Not in-place"],
    pseudocode: [
      "// Merge Sort Algorithm",
      "function mergeSort(arr, left, right):",
      "  if left < right:",
      "    mid = (left + right) / 2",
      "    mergeSort(arr, left, mid)",
      "    mergeSort(arr, mid+1, right)",
      "    merge(arr, left, mid, right)"
    ]
  },
  quick: {
    name: "Quick Sort",
    description: "Quick Sort uses a divide-and-conquer approach by selecting a pivot element and partitioning the array around it, then recursively sorting the subarrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    stable: false,
    inPlace: true,
    pros: ["Fast average case", "In-place sorting", "Cache efficient"],
    cons: ["Worst case O(n²)", "Not stable", "Pivot selection affects performance"],
    pseudocode: [
      "// Quick Sort Algorithm",
      "function quickSort(arr, low, high):",
      "  if low < high:",
      "    pi = partition(arr, low, high)",
      "    quickSort(arr, low, pi-1)",
      "    quickSort(arr, pi+1, high)"
    ]
  },
  heap: {
    name: "Heap Sort",
    description: "Heap Sort uses a binary heap data structure to sort elements. It first builds a max heap, then repeatedly extracts the maximum element.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    pros: ["Guaranteed O(n log n)", "In-place sorting", "No worst-case degradation"],
    cons: ["Not stable", "Poor cache performance", "Complex implementation"],
    pseudocode: [
      "// Heap Sort Algorithm",
      "buildMaxHeap(arr)",
      "for i = n-1 to 1:",
      "  swap(arr[0], arr[i])",
      "  heapSize = heapSize - 1",
      "  maxHeapify(arr, 0)"
    ]
  },
  radix: {
    name: "Radix Sort",
    description: "Radix Sort is a non-comparative sorting algorithm that sorts integers by grouping them by individual digits which share the same significant position.",
    timeComplexity: {
      best: "O(d(n+k))",
      average: "O(d(n+k))",
      worst: "O(d(n+k))"
    },
    spaceComplexity: "O(n+k)",
    stable: true,
    inPlace: false,
    pros: ["Linear time complexity", "Stable algorithm", "Good for fixed-length integers"],
    cons: ["Only works with integers", "Requires extra space", "Limited to specific data types"],
    pseudocode: [
      "// Radix Sort Algorithm",
      "function radixSort(arr):",
      "  max = getMax(arr)",
      "  for exp = 1; max/exp > 0; exp *= 10:",
      "    countingSort(arr, exp)"
    ]
  },
  shell: {
    name: "Shell Sort",
    description: "Shell Sort is an extension of insertion sort that allows the exchange of items that are far apart, gradually reducing the gap between elements to be compared.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n^1.25)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    pros: ["Better than O(n²) algorithms", "In-place sorting", "Adaptive"],
    cons: ["Gap sequence affects performance", "Not stable", "Complex analysis"],
    pseudocode: [
      "// Shell Sort Algorithm",
      "gap = n/2",
      "while gap > 0:",
      "  for i = gap to n:",
      "    temp = arr[i]",
      "    j = i",
      "    while j >= gap and arr[j-gap] > temp:",
      "      arr[j] = arr[j-gap]",
      "      j -= gap",
      "    arr[j] = temp",
      "  gap = gap/2"
    ]
  }
};
