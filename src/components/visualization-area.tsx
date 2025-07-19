import type { AlgorithmInfo } from "../shared/schema";
import { Progress } from "./ui/progress";
// import { AlgorithmInfo } from "@shared/schema";

interface VisualizationAreaProps {
  visualizer: {
    array: any[];
    currentStep: number;
    totalSteps: number;
    progress: number;
    currentStepData: any;
  };
  algorithmInfo: AlgorithmInfo;
}

export function VisualizationArea({ visualizer, algorithmInfo }: VisualizationAreaProps) {
  const maxHeight = 320;
  const maxValue = visualizer.array.length > 0 ? Math.max(...visualizer.array.map(el => el.value)) : 100;
  const barWidth = Math.max(4, Math.min(20, (800 - visualizer.array.length * 2) / visualizer.array.length));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{algorithmInfo.name} Visualization</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Sorted</span>
          </div>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative bg-gray-50 rounded-lg p-4 min-h-96">
        <div className="flex items-end justify-center space-x-px h-80 overflow-x-auto" style={{ minWidth: `${visualizer.array.length * (barWidth + 1)}px` }}>
          {visualizer.array.map((element, index) => {
            const height = (element.value / maxValue) * maxHeight;
            const getBarColor = () => {
              switch (element.state) {
                case "comparing":
                  return "bg-yellow-400";
                case "swapping":
                  return "bg-red-500";
                case "sorted":
                  return "bg-green-500";
                default:
                  return "bg-blue-500";
              }
            };

            return (
              <div
                key={element.id}
                className={`animate-bar transition-all duration-300 rounded-t-sm flex-shrink-0 ${getBarColor()}`}
                style={{
                  width: `${barWidth}px`,
                  height: `${height}px`,
                }}
                title={`Value: ${element.value}, Index: ${index}`}
              />
            );
          })}
        </div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-2 left-4 text-xs text-gray-500">
          <span>Step {visualizer.currentStep}</span> of <span>{visualizer.totalSteps}</span>
        </div>

        {/* Step description */}
        {visualizer.currentStepData?.description && (
          <div className="absolute bottom-2 right-4 text-xs text-gray-600 max-w-md text-right">
            {visualizer.currentStepData.description}
          </div>
        )}
      </div>

      {/* Algorithm Progress */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="text-gray-900 font-medium">{Math.round(visualizer.progress)}%</span>
        </div>
        <div className="mt-2">
          <Progress value={visualizer.progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
