import { useState, useCallback, useEffect, useRef } from "react";
import type { ArrayElement, SortingStep, SortingAlgorithm, AnimationSpeed, AlgorithmStats } from "../shared/schema";
import { SortingAlgorithms } from "../lib/sorting-algorithms";
// import { SortingAlgorithms } from "@/lib/sorting-algorithms";

interface UseSortingVisualizerReturn {
  array: ArrayElement[];
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  isComplete: boolean;
  currentAlgorithm: SortingAlgorithm;
  animationSpeed: AnimationSpeed;
  arraySize: number;
  stats: AlgorithmStats;
  currentStepData: SortingStep | null;
  progress: number;
  
  // Actions
  play: () => void;
  pause: () => void;
  reset: () => void;
  shuffle: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  setAlgorithm: (algorithm: SortingAlgorithm) => void;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  setArraySize: (size: number) => void;
  generateCustomArray: (values: number[]) => void;
}

const SPEED_DELAYS = {
  slow: 1000,
  normal: 100,
  fast: 10
};

export function useSortingVisualizer(): UseSortingVisualizerReturn {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SortingAlgorithm>("bubble");
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>("normal");
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<AlgorithmStats>({
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    arrayAccesses: 0
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const intervalRef = useRef(null);
  const timeIntervalRef = useRef(null);

  // Generate initial array
  const generateArray = useCallback((size: number) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        id: `element-${Date.now()}-${i}`,
        value: Math.floor(Math.random() * 300) + 10,
        state: "default"
      });
    }
    return newArray;
  }, []);

  // Initialize array
  useEffect(() => {
    const newArray = generateArray(arraySize);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0,
      arrayAccesses: 0
    });
  }, [arraySize, generateArray]);

  // Generate steps when algorithm changes
  useEffect(() => {
    if (array.length > 0) {
      const newSteps = SortingAlgorithms.generateSteps(currentAlgorithm, array);
      setSteps(newSteps);
      setCurrentStep(0);
      setStats({
        comparisons: 0,
        swaps: 0,
        timeElapsed: 0,
        arrayAccesses: 0
      });
    }
  }, [currentAlgorithm, array]);

  // Animation loop
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        
        // Update stats
        const step = steps[currentStep + 1];
        if (step) {
          setStats(prev => ({
            ...prev,
            comparisons: step.comparingIndices ? prev.comparisons + 1 : prev.comparisons,
            swaps: step.swappingIndices ? prev.swaps + 1 : prev.swaps,
            arrayAccesses: prev.arrayAccesses + 1
          }));
        }
      }, SPEED_DELAYS[animationSpeed]);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, animationSpeed]);

  // Time tracking
  useEffect(() => {
    if (isPlaying && !startTime) {
      setStartTime(Date.now());
      timeIntervalRef.current = setInterval(() => {
        setStats(prev => ({
          ...prev,
          timeElapsed: (Date.now() - (startTime || Date.now())) / 1000
        }));
      }, 100);
    } else if (!isPlaying && startTime) {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
      if (currentStep >= steps.length - 1) {
        setStartTime(null);
      }
    }

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [isPlaying, startTime, currentStep, steps.length]);

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setStats({
        comparisons: 0,
        swaps: 0,
        timeElapsed: 0,
        arrayAccesses: 0
      });
      setStartTime(null);
    }
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0,
      arrayAccesses: 0
    });
    setStartTime(null);
  }, []);

  const shuffle = useCallback(() => {
    const newArray = generateArray(arraySize);
    setArray(newArray);
    setIsPlaying(false);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0,
      arrayAccesses: 0
    });
    setStartTime(null);
  }, [arraySize, generateArray]);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      const step = steps[currentStep + 1];
      if (step) {
        setStats(prev => ({
          ...prev,
          comparisons: step.comparingIndices ? prev.comparisons + 1 : prev.comparisons,
          swaps: step.swappingIndices ? prev.swaps + 1 : prev.swaps,
          arrayAccesses: prev.arrayAccesses + 1
        }));
      }
    }
  }, [currentStep, steps]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Note: We don't decrease stats when stepping backward for simplicity
    }
  }, [currentStep]);

  const setAlgorithm = useCallback((algorithm: SortingAlgorithm) => {
    setCurrentAlgorithm(algorithm);
    setIsPlaying(false);
  }, []);

  const handleSetArraySize = useCallback((size: number) => {
    setArraySize(size);
    setIsPlaying(false);
  }, []);

  const generateCustomArray = useCallback((values: number[]) => {
    const timestamp = Date.now();
    const customArray: ArrayElement[] = values.map((value, index) => ({
      id: `custom-${timestamp}-${index}`,
      value,
      state: "default"
    }));
    setArray(customArray);
    setArraySize(values.length);
    setIsPlaying(false);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0,
      arrayAccesses: 0
    });
    setStartTime(null);
  }, []);

  // Get current step data and create stable visualization array
  const currentStepData = steps[currentStep] || null;
  
  // Always maintain the original array size by using the base array as template
  const baseArray = [...array].slice(0, arraySize);
  let visualizationArray = baseArray;
  
  if (currentStepData && currentStepData.array) {
    // Only use step data if it has the same length as our base array
    if (currentStepData.array.length === arraySize) {
      visualizationArray = [...currentStepData.array].slice(0, arraySize);
    }
  }
  
  // Create clean array with proper states and unique IDs
  const processedArray = visualizationArray.map((element, index) => {
    if (!element || typeof element.value !== 'number') {
      // Use fallback from base array if element is invalid
      element = baseArray[index] || { value: 0, state: "default" as const, id: "" };
    }
    
    let elementState: "default" | "comparing" | "swapping" | "sorted" = "default";
    
    if (currentStepData) {
      if (currentStepData.comparingIndices?.includes(index)) {
        elementState = "comparing";
      } else if (currentStepData.swappingIndices?.includes(index)) {
        elementState = "swapping";
      } else if (currentStepData.sortedIndices?.includes(index)) {
        elementState = "sorted";
      }
    }
    
    return {
      ...element,
      id: `vis-${currentStep}-${index}-${element.value}`,
      state: elementState
    };
  });

  const progress = steps.length > 0 ? (currentStep / (steps.length - 1)) * 100 : 0;
  const isComplete = currentStep >= steps.length - 1;

  return {
    array: processedArray,
    currentStep,
    totalSteps: steps.length,
    isPlaying,
    isComplete,
    currentAlgorithm,
    animationSpeed,
    arraySize,
    stats,
    currentStepData,
    progress,
    
    play,
    pause,
    reset,
    shuffle,
    stepForward,
    stepBackward,
    setAlgorithm,
    setAnimationSpeed,
    setArraySize: handleSetArraySize,
    generateCustomArray
  };
}
