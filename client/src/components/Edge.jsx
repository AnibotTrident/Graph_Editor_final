import React, { useEffect, useState } from 'react';

const Edge = ({ source, target, onDelete }) => {
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const updateLine = () => {
      const sourceNode = document.getElementById(source);
      const targetNode = document.getElementById(target);

      if (!sourceNode || !targetNode) return;

      const sourceRect = sourceNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();

      const canvas = document.querySelector('.graph-canvas');
      const canvasRect = canvas.getBoundingClientRect();

      setLine({
        x1: sourceRect.left + sourceRect.width / 2 - canvasRect.left,
        y1: sourceRect.top + sourceRect.height / 2 - canvasRect.top,
        x2: targetRect.left + targetRect.width / 2 - canvasRect.left,
        y2: targetRect.top + targetRect.height / 2 - canvasRect.top,
      });
    };

    updateLine();

    // Add event listener to track changes in node positions
    const intervalId = setInterval(updateLine, 10); // Polling for updates

    return () => clearInterval(intervalId);
  }, [source, target]);

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx={(line.x1 + line.x2) / 2}
        cy={(line.y1 + line.y2) / 2}
        r="12"
        fill="red"
        onClick={onDelete}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      />
      <text
        x={(line.x1 + line.x2) / 2}
        y={(line.y1 + line.y2) / 2 + 4} // Adjust to align with the circle
        textAnchor="middle"
        fill="white"
        fontSize="12"
        style={{ pointerEvents: 'none' }}
      >
        X
      </text>
    </svg>
  );
};

export default Edge;
