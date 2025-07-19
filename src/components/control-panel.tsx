// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";
import type { SortingAlgorithm, AnimationSpeed } from "../shared/schema"
import { Button } from "./ui/button";

interface ControlPanelProps {
  visualizer: {
    currentAlgorithm: SortingAlgorithm;
    animationSpeed: AnimationSpeed;
    arraySize: number;
    isPlaying: boolean;
    setAlgorithm: (algorithm: SortingAlgorithm) => void;
    setAnimationSpeed: (speed: AnimationSpeed) => void;
    setArraySize: (size: number) => void;
    play: () => void;
    pause: () => void;
    reset: () => void;
    shuffle: () => void;
  };
}

const algorithmOptions = [
  { value: "bubble" as const, label: "Bubble Sort" },
  { value: "selection" as const, label: "Selection Sort" },
  { value: "insertion" as const, label: "Insertion Sort" },
  { value: "merge" as const, label: "Merge Sort" },
  { value: "quick" as const, label: "Quick Sort" },
  { value: "heap" as const, label: "Heap Sort" },
  { value: "radix" as const, label: "Radix Sort" },
  { value: "shell" as const, label: "Shell Sort" },
];

const speedOptions = [
  { value: "slow" as const, label: "Slow" },
  { value: "normal" as const, label: "Normal" },
  { value: "fast" as const, label: "Fast" },
];

export function ControlPanel({ visualizer }: ControlPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Algorithm Selection */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
          <Select
            value={visualizer.currentAlgorithm}
            onValueChange={(value) => visualizer.setAlgorithm(value as SortingAlgorithm)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {algorithmOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed Control */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Speed</label>
          <div className="flex space-x-2">
            {speedOptions.map((speed) => (
              <Button
                key={speed.value}
                variant={visualizer.animationSpeed === speed.value ? "default" : "outline"}
                size="sm"
                onClick={() => visualizer.setAnimationSpeed(speed.value)}
                className="flex-1"
              >
                {speed.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Array Size */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Array Size: <span className="text-primary font-semibold">{visualizer.arraySize}</span>
          </label>
          <Slider
            value={[visualizer.arraySize]}
            onValueChange={(value) => visualizer.setArraySize(value[0])}
            max={100}
            min={10}
            step={5}
            className="w-full slider"
          />
        </div>

        {/* Control Buttons */}
        <div className="lg:col-span-1 flex items-end space-x-2">
          <Button
            onClick={visualizer.isPlaying ? visualizer.pause : visualizer.play}
            className="flex items-center space-x-2"
          >
            {visualizer.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{visualizer.isPlaying ? "Pause" : "Play"}</span>
          </Button>
          <Button
            variant="outline"
            onClick={visualizer.reset}
            size="icon"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={visualizer.shuffle}
            size="icon"
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
