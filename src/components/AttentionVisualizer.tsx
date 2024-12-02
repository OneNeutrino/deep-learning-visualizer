import React, { useState, useEffect } from 'react';
import { Heatmap } from './Heatmap';
import { Controls } from './Controls';

interface AttentionVisualizerProps {
  attentionWeights: number[][];
  tokens: string[];
  layerIndex: number;
  headIndex: number;
}

const AttentionVisualizer: React.FC<AttentionVisualizerProps> = ({
  attentionWeights,
  tokens,
  layerIndex,
  headIndex,
}) => {
  const [threshold, setThreshold] = useState(0.1);
  const [normalizedWeights, setNormalizedWeights] = useState<number[][]>([]);

  useEffect(() => {
    // Normalize attention weights
    const weights = attentionWeights.map(row => {
      const maxWeight = Math.max(...row);
      return row.map(weight => weight / maxWeight);
    });
    setNormalizedWeights(weights);
  }, [attentionWeights]);

  return (
    <div className="attention-visualizer">
      <Controls
        threshold={threshold}
        onThresholdChange={setThreshold}
        layerIndex={layerIndex}
        headIndex={headIndex}
      />
      <Heatmap
        data={normalizedWeights}
        xLabels={tokens}
        yLabels={tokens}
        threshold={threshold}
      />
    </div>
  );
};

export default AttentionVisualizer;