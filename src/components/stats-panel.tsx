// import { AlgorithmInfo } from "@shared/schema";

import type { AlgorithmInfo } from "../shared/schema";

interface StatsPanelProps {
  visualizer: {
    stats: {
      comparisons: number;
      swaps: number;
      timeElapsed: number;
      arrayAccesses: number;
    };
  };
  algorithmInfo: AlgorithmInfo;
}

export function StatsPanel({ visualizer, algorithmInfo }: StatsPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Comparisons</span>
          <span className="text-lg font-semibold text-gray-900">{visualizer.stats.comparisons}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Swaps</span>
          <span className="text-lg font-semibold text-gray-900">{visualizer.stats.swaps}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Array Accesses</span>
          <span className="text-lg font-semibold text-gray-900">{visualizer.stats.arrayAccesses}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Time Elapsed</span>
          <span className="text-lg font-semibold text-gray-900">{visualizer.stats.timeElapsed.toFixed(1)}s</span>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Time Complexity</div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Best Case</div>
            <div className="font-mono text-sm font-medium text-gray-900">{algorithmInfo.timeComplexity.best}</div>
            <div className="text-xs text-gray-500 mt-2 mb-1">Average Case</div>
            <div className="font-mono text-sm font-medium text-gray-900">{algorithmInfo.timeComplexity.average}</div>
            <div className="text-xs text-gray-500 mt-2 mb-1">Worst Case</div>
            <div className="font-mono text-sm font-medium text-gray-900">{algorithmInfo.timeComplexity.worst}</div>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Space Complexity</div>
          <div className="font-mono text-sm font-medium text-gray-900">{algorithmInfo.spaceComplexity}</div>
        </div>
        <div className="pt-3 border-t border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Stable</span>
            <span className={`text-sm font-medium ${algorithmInfo.stable ? 'text-green-600' : 'text-red-600'}`}>
              {algorithmInfo.stable ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">In-place</span>
            <span className={`text-sm font-medium ${algorithmInfo.inPlace ? 'text-green-600' : 'text-red-600'}`}>
              {algorithmInfo.inPlace ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
