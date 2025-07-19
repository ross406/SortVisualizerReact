import type { ArrayElement, SortingStep, SortingAlgorithm } from "../shared/schema";

export class SortingAlgorithms {
  static generateSteps(algorithm: SortingAlgorithm, array: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const arr = [...array];
    
    switch (algorithm) {
      case "bubble":
        return this.bubbleSort(arr);
      case "selection":
        return this.selectionSort(arr);
      case "insertion":
        return this.insertionSort(arr);
      case "merge":
        return this.mergeSort(arr, 0, arr.length - 1);
      case "quick":
        const quickSteps = this.quickSort(arr, 0, arr.length - 1);
        // Add final step marking all elements as sorted
        quickSteps.push({
          array: [...arr],
          sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
          description: "Quick sort complete!"
        });
        return quickSteps;
      case "heap":
        return this.heapSort(arr);
      case "radix":
        return this.radixSort(arr);
      case "shell":
        return this.shellSort(arr);
      default:
        return [{ array: arr }];
    }
  }

  private static bubbleSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], currentLine: 0, description: "Starting Bubble Sort" });
    
    for (let i = 0; i < n - 1; i++) {
      steps.push({ array: [...arr], currentLine: 1, description: `Pass ${i + 1}` });
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          currentLine: 3,
          description: `Comparing ${arr[j].value} and ${arr[j + 1].value}`
        });
        
        if (arr[j].value > arr[j + 1].value) {
          // Swapping
          steps.push({
            array: [...arr],
            swappingIndices: [j, j + 1],
            currentLine: 4,
            description: `Swapping ${arr[j].value} and ${arr[j + 1].value}`
          });
          
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          steps.push({
            array: [...arr],
            currentLine: 4,
            description: `Swapped ${arr[j].value} and ${arr[j + 1].value}`
          });
        }
      }
      
      // Mark the last element as sorted
      const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx);
      steps.push({
        array: [...arr],
        sortedIndices,
        description: `Element at position ${n - 1 - i} is in its final position`
      });
    }
    
    // Mark all elements as sorted
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      description: "Sorting complete!"
    });
    
    return steps;
  }

  private static selectionSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], currentLine: 0, description: "Starting Selection Sort" });
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      steps.push({
        array: [...arr],
        currentLine: 2,
        description: `Finding minimum in unsorted portion starting at position ${i}`
      });
      
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arr],
          comparingIndices: [j, minIdx],
          currentLine: 4,
          description: `Comparing ${arr[j].value} with current minimum ${arr[minIdx].value}`
        });
        
        if (arr[j].value < arr[minIdx].value) {
          minIdx = j;
          steps.push({
            array: [...arr],
            currentLine: 5,
            description: `New minimum found: ${arr[minIdx].value}`
          });
        }
      }
      
      if (minIdx !== i) {
        steps.push({
          array: [...arr],
          swappingIndices: [i, minIdx],
          currentLine: 6,
          description: `Swapping ${arr[i].value} with minimum ${arr[minIdx].value}`
        });
        
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      
      const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);
      steps.push({
        array: [...arr],
        sortedIndices,
        description: `Position ${i} is sorted`
      });
    }
    
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      description: "Sorting complete!"
    });
    
    return steps;
  }

  private static insertionSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], currentLine: 0, description: "Starting Insertion Sort" });
    
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      
      steps.push({
        array: [...arr],
        comparingIndices: [i],
        currentLine: 2,
        description: `Inserting ${key.value} into sorted portion`
      });
      
      while (j >= 0 && arr[j].value > key.value) {
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          currentLine: 4,
          description: `Moving ${arr[j].value} one position right`
        });
        
        arr[j + 1] = arr[j];
        j--;
        
        steps.push({
          array: [...arr],
          currentLine: 5,
          description: `Shifted ${arr[j + 2].value} to the right`
        });
      }
      
      arr[j + 1] = key;
      
      steps.push({
        array: [...arr],
        currentLine: 7,
        description: `Placed ${key.value} at position ${j + 1}`
      });
      
      const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);
      steps.push({
        array: [...arr],
        sortedIndices,
        description: `First ${i + 1} elements are sorted`
      });
    }
    
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      description: "Sorting complete!"
    });
    
    return steps;
  }

  private static mergeSort(arr: ArrayElement[], left: number, right: number): SortingStep[] {
    const steps: SortingStep[] = [];
    
    if (left >= right) return steps;
    
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: [...arr],
      currentLine: 2,
      description: `Dividing array from ${left} to ${right} at position ${mid}`
    });
    
    steps.push(...this.mergeSort(arr, left, mid));
    steps.push(...this.mergeSort(arr, mid + 1, right));
    steps.push(...this.merge(arr, left, mid, right));
    
    return steps;
  }

  private static merge(arr: ArrayElement[], left: number, mid: number, right: number): SortingStep[] {
    const steps: SortingStep[] = [];
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    steps.push({
      array: [...arr],
      currentLine: 6,
      description: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`
    });
    
    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparingIndices: [k],
        description: `Comparing ${leftArr[i].value} and ${rightArr[j].value}`
      });
      
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i] };
        i++;
      } else {
        arr[k] = { ...rightArr[j] };
        j++;
      }
      k++;
      
      steps.push({
        array: [...arr],
        description: `Placed ${arr[k - 1].value} at position ${k - 1}`
      });
    }
    
    while (i < leftArr.length) {
      arr[k] = { ...leftArr[i] };
      i++;
      k++;
      steps.push({
        array: [...arr],
        description: `Copying remaining element ${arr[k - 1].value}`
      });
    }
    
    while (j < rightArr.length) {
      arr[k] = { ...rightArr[j] };
      j++;
      k++;
      steps.push({
        array: [...arr],
        description: `Copying remaining element ${arr[k - 1].value}`
      });
    }
    
    return steps;
  }

  private static quickSort(arr: ArrayElement[], low: number, high: number, sortedElements: Set<number> = new Set()): SortingStep[] {
    const steps: SortingStep[] = [];
    
    if (low >= high) {
      // Mark single elements as sorted
      if (low === high) {
        sortedElements.add(low);
      }
      return steps;
    }
    
    steps.push({
      array: [...arr],
      currentLine: 2,
      description: `Sorting subarray from ${low} to ${high}`
    });
    
    const pi = this.partition(arr, low, high, steps);
    
    // Mark pivot as sorted
    sortedElements.add(pi);
    steps.push({
      array: [...arr],
      sortedIndices: Array.from(sortedElements),
      description: `Pivot ${arr[pi].value} is in correct position`
    });
    
    steps.push(...this.quickSort(arr, low, pi - 1, sortedElements));
    steps.push(...this.quickSort(arr, pi + 1, high, sortedElements));
    
    return steps;
  }

  private static partition(arr: ArrayElement[], low: number, high: number, steps: SortingStep[]): number {
    const pivot = arr[high];
    let i = low - 1;
    
    steps.push({
      array: [...arr],
      description: `Using ${pivot.value} as pivot`
    });
    
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, high],
        description: `Comparing ${arr[j].value} with pivot ${pivot.value}`
      });
      
      if (arr[j].value < pivot.value) {
        i++;
        if (i !== j) {
          steps.push({
            array: [...arr],
            swappingIndices: [i, j],
            description: `Swapping ${arr[i].value} and ${arr[j].value}`
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
    
    steps.push({
      array: [...arr],
      swappingIndices: [i + 1, high],
      description: `Placing pivot ${pivot.value} at correct position`
    });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
  }

  private static heapSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], description: "Building max heap" });
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      steps.push(...this.heapify(arr, n, i));
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        array: [...arr],
        swappingIndices: [0, i],
        description: `Moving max element ${arr[0].value} to position ${i}`
      });
      [arr[0], arr[i]] = [arr[i], arr[0]];
      
      steps.push(...this.heapify(arr, i, 0));
      
      const sortedIndices = Array.from({ length: n - i }, (_, idx) => i + idx);
      steps.push({
        array: [...arr],
        sortedIndices,
        description: `Elements from position ${i} are sorted`
      });
    }
    
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      description: "Heap sort complete!"
    });
    
    return steps;
  }

  private static heapify(arr: ArrayElement[], n: number, i: number): SortingStep[] {
    const steps: SortingStep[] = [];
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      steps.push({
        array: [...arr],
        comparingIndices: [left, largest],
        description: `Comparing left child ${arr[left].value} with ${arr[largest].value}`
      });
      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
    }
    
    if (right < n) {
      steps.push({
        array: [...arr],
        comparingIndices: [right, largest],
        description: `Comparing right child ${arr[right].value} with ${arr[largest].value}`
      });
      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      steps.push({
        array: [...arr],
        swappingIndices: [i, largest],
        description: `Swapping ${arr[i].value} with ${arr[largest].value}`
      });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      
      steps.push(...this.heapify(arr, n, largest));
    }
    
    return steps;
  }

  private static radixSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const max = Math.max(...arr.map(el => el.value));
    
    steps.push({
      array: [...arr],
      description: `Starting Radix Sort. Maximum value: ${max}`
    });
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      steps.push({
        array: [...arr],
        description: `Sorting by digit at position ${exp === 1 ? 'units' : exp === 10 ? 'tens' : 'hundreds'}`
      });
      
      // Perform counting sort for this digit position
      const n = arr.length;
      const output: ArrayElement[] = new Array(n);
      const count = new Array(10).fill(0);
      
      // Count occurrences of each digit
      for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i].value / exp) % 10;
        count[digit]++;
      }
      
      // Change count[i] so that count[i] contains actual position
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
      
      // Build the output array
      for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i].value / exp) % 10;
        output[count[digit] - 1] = { 
          ...arr[i],
          id: `radix-${exp}-${count[digit] - 1}-${arr[i].value}`
        };
        count[digit]--;
      }
      
      // Copy output array back to original array
      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
      }
      
      steps.push({
        array: [...arr],
        description: `Completed sorting by ${exp === 1 ? 'units' : exp === 10 ? 'tens' : 'hundreds'} place`
      });
    }
    
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
      description: "Radix sort complete!"
    });
    
    return steps;
  }



  private static shellSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const n = arr.length;
    
    steps.push({ array: [...arr], description: "Starting Shell Sort" });
    
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      steps.push({
        array: [...arr],
        description: `Using gap size: ${gap}`
      });
      
      for (let i = gap; i < n; i++) {
        const temp = { ...arr[i] };
        let j = i;
        
        steps.push({
          array: [...arr],
          comparingIndices: [i],
          description: `Inserting ${temp.value} with gap ${gap}`
        });
        
        while (j >= gap && arr[j - gap].value > temp.value) {
          steps.push({
            array: [...arr],
            comparingIndices: [j, j - gap],
            description: `Comparing ${arr[j].value} with ${arr[j - gap].value}`
          });
          
          arr[j] = { ...arr[j - gap] };
          j -= gap;
          
          steps.push({
            array: [...arr],
            description: `Moved element forward by gap ${gap}`
          });
        }
        
        arr[j] = temp;
        steps.push({
          array: [...arr],
          description: `Placed ${temp.value} at position ${j}`
        });
      }
    }
    
    steps.push({
      array: [...arr],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      description: "Shell sort complete!"
    });
    
    return steps;
  }
}
