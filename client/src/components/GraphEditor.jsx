import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGraph,
  addNode,
  addEdge,
  removeEdge,
  removeNode,
  undo,
  redo,
} from '../redux/graphSlice';
import Node from './Node';
import Edge from './Edge';
import { fetchGraph, saveGraph } from '../utils/api';

const GraphEditor = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.graph);
  const [isCreateEdgeMode, setCreateEdgeMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    const loadGraph = async () => {
      const graph = await fetchGraph('default'); // Replace with actual graph ID
      if (graph) dispatch(setGraph(graph));
    };
    loadGraph();

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'z') {
        dispatch(undo());
      } else if (event.ctrlKey && event.key === 'y') {
        dispatch(redo());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleAddNode = () => {
    const canvas = document.querySelector('.graph-canvas');
    const canvasRect = canvas.getBoundingClientRect();

    const position = {
      x: Math.random() * (canvasRect.width - 60), // Prevent node from going outside horizontally
      y: Math.random() * (canvasRect.height - 60), // Prevent node from going outside vertically
    };

    dispatch(addNode({ position }));
  };

  const handleCreateEdgeMode = () => {
    setCreateEdgeMode(!isCreateEdgeMode);
    setSelectedNodes([]); // Reset selected nodes when toggling mode
  };

  const handleNodeClick = (nodeId) => {
    if (isCreateEdgeMode) {
      setSelectedNodes((prev) => {
        const updated = [...prev, nodeId];
        if (updated.length === 2) {
          dispatch(addEdge({ source: updated[0], target: updated[1] }));
          setTimeout(() => {
            setSelectedNodes([]); // Reset after a short delay to visually confirm the edge creation
          }, 0);
          setCreateEdgeMode(false); // Exit Create Edge mode
        }
        return updated;
      });
    }
  };

  const handleSave = async () => {
    const graph = { nodes, edges };
    await saveGraph(graph);
    alert('Graph saved successfully!');
  };

  return (
    <div>
      <h1>Graph Editor</h1>
      <div
        className="graph-canvas"
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid black',
          background: '#f4f4f4',
        }}
      >
        {edges.map((edge, index) => (
          <Edge
            key={index}
            source={edge.source}
            target={edge.target}
            onDelete={() =>
              dispatch(removeEdge({ source: edge.source, target: edge.target }))
            }
          />
        ))}
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            id={node.id}
            label={`N${index + 1}`}
            position={node.position}
            onClick={() => handleNodeClick(node.id)}
            isSelected={selectedNodes.includes(node.id)}
            onDelete={() => dispatch(removeNode(node.id))}
          />
        ))}
      </div>
      <button onClick={handleAddNode}>Add Node</button>
      <button
        onClick={handleCreateEdgeMode}
        style={{
          backgroundColor: isCreateEdgeMode ? 'lightgreen' : '',
          border: isCreateEdgeMode ? '2px solid black' : 'none',
        }}
      >
        Create Edge
      </button>
      <button onClick={handleSave}>Save Graph</button>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default GraphEditor;
