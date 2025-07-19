// import { AlgorithmInfo } from "@shared/schema";

import type { AlgorithmInfo } from "../shared/schema";

interface CodePanelProps {
  visualizer: {
    currentStepData: {
      currentLine?: number;
    } | null;
  };
  algorithmInfo: AlgorithmInfo;
}

export function CodePanel({ visualizer, algorithmInfo }: CodePanelProps) {
  const currentLine = visualizer.currentStepData?.currentLine;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pseudocode</h3>
      <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
        <div className="text-gray-300">
          {algorithmInfo.pseudocode.map((line, index) => (
            <div
              key={index}
              className={`${
                currentLine === index ? 'bg-yellow-600 bg-opacity-20 px-1 rounded' : ''
              } ${line.startsWith('//') ? 'text-green-400' : 'text-white'}`}
            >
              {line.includes('for') || line.includes('while') || line.includes('if') ? (
                <>
                  <span className="text-blue-400">
                    {line.match(/(for|while|if|function)/)?.[0] || ''}
                  </span>
                  <span className="text-white">
                    {line.replace(/(for|while|if|function)/, '')}
                  </span>
                </>
              ) : (
                line
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Code execution indicator */}
      {typeof currentLine === 'number' && (
        <div className="mt-3 text-xs text-gray-500 flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span>Currently executing: Line {currentLine + 1}</span>
        </div>
      )}
    </div>
  );
}
