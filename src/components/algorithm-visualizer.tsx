import { ControlPanel } from "./control-panel";
import { VisualizationArea } from "./visualization-area";
import { StatsPanel } from "./stats-panel";
import { CodePanel } from "./code-panel";
// import { useSortingVisualizer } from "@/hooks/use-sorting-visualizer";
// import { algorithmData } from "@/lib/algorithm-data";
// import { Button } from "@/components/ui/button";
import { SkipForward, SkipBack, Edit, Scale } from "lucide-react";
import { useSortingVisualizer } from "../hooks/use-sorting-visualizer";
import { algorithmData } from "../lib/algorithm-data";
import { Button } from "./ui/button";

export function AlgorithmVisualizer() {
  const visualizer = useSortingVisualizer();
  const algorithmInfo = algorithmData[visualizer.currentAlgorithm];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Control Panel */}
      <ControlPanel visualizer={visualizer} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Visualization Area */}
        <div className="xl:col-span-3">
          <VisualizationArea visualizer={visualizer} algorithmInfo={algorithmInfo} />
        </div>

        {/* Stats and Code */}
        <div className="xl:col-span-1 space-y-6">
          <StatsPanel visualizer={visualizer} algorithmInfo={algorithmInfo} />
          <CodePanel visualizer={visualizer} algorithmInfo={algorithmInfo} />
          
          {/* Algorithm Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About {algorithmInfo.name}</h3>
            <div className="text-sm text-gray-600 space-y-3">
              <p>{algorithmInfo.description}</p>
              <div className="space-y-2">
                {algorithmInfo.pros.map((pro, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>{pro}</span>
                  </div>
                ))}
                {algorithmInfo.cons.map((con, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Advanced Controls</h3>
            <p className="text-sm text-gray-600 mt-1">Fine-tune your visualization experience</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={visualizer.stepBackward}
              disabled={visualizer.currentStep === 0}
              className="flex items-center space-x-2"
            >
              <SkipBack className="w-4 h-4" />
              <span>Step Back</span>
            </Button>
            <Button
              variant="outline"
              onClick={visualizer.stepForward}
              disabled={visualizer.currentStep >= visualizer.totalSteps - 1}
              className="flex items-center space-x-2"
            >
              <SkipForward className="w-4 h-4" />
              <span>Step Forward</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const values = prompt("Enter comma-separated values (e.g., 64,34,25,12,22,11,90):");
                if (values) {
                  const customValues = values.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                  if (customValues.length > 0) {
                    visualizer.generateCustomArray(customValues);
                  }
                }
              }}
              className="flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Custom Array</span>
            </Button>
            <Button
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                alert("Compare algorithms feature coming soon!");
              }}
            >
              <Scale className="w-4 h-4" />
              <span>Compare Algorithms</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
