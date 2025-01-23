import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateNodePosition } from '../redux/graphSlice';

const Node = ({ id, label, position, onClick, isSelected, onDelete }) => {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = document.querySelector('.graph-canvas');
    const canvasRect = canvas.getBoundingClientRect();

    const newX = e.clientX - canvasRect.left - 30; // 30 = half of node width
    const newY = e.clientY - canvasRect.top - 30; // 30 = half of node height

    dispatch(updateNodePosition({ id, position: { x: newX, y: newY } }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      id={id}
      ref={nodeRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '60px',
        height: '60px',
        backgroundColor: isSelected ? '#90ee90' : '#87ceeb',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black',
        cursor: 'grab',
        fontSize: '14px',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the node
      onClick={onClick}
    >
      {label}
      <button
        style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          width: '16px',
          height: '16px',
          cursor: 'pointer',
          padding: 0,
          fontSize: '10px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        X
      </button>
    </div>
  );
};

export default Node;
