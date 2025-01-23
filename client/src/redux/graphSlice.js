import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  nodes: [],
  edges: [],
  history: [], // For undo functionality
  future: [],  // For redo functionality
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraph: (state, action) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    addNode: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.nodes.push({
        id: uuidv4(),
        label: action.payload.label || `Node ${state.nodes.length + 1}`,
        position: action.payload.position,
      });
      state.future = [];
    },
    removeNode: (state, action) => {
      const nodeId = action.payload;
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      state.future = [];
    },
    addEdge: (state, action) => {
      const { source, target } = action.payload;

      // Prevent duplicate edges
      const isDuplicate = state.edges.some(
        (edge) => edge.source === source && edge.target === target
      );

      if (!isDuplicate) {
        state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.edges.push({ source, target });
        state.future = [];
      }
    },
    removeEdge: (state, action) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.edges = state.edges.filter(
        (edge) =>
          edge.source !== action.payload.source ||
          edge.target !== action.payload.target
      );
      state.future = [];
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previousState = state.history.pop();
        state.future.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.nodes = previousState.nodes;
        state.edges = previousState.edges;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
        state.nodes = nextState.nodes;
        state.edges = nextState.edges;
      }
    },
    updateNodePosition: (state, action) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position;
      }
    },
    resetGraph: (state) => {
      state.history.push({ nodes: [...state.nodes], edges: [...state.edges] });
      state.nodes = [];
      state.edges = [];
      state.future = [];
    },
  },
});

export const {
  setGraph,
  addNode,
  removeNode,
  addEdge,
  removeEdge,
  undo,
  redo,
  updateNodePosition,
  resetGraph,
} = graphSlice.actions;

export default graphSlice.reducer;
