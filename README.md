# Graph Editor

A simple and interactive graph editor that allows users to create, connect, and manipulate nodes and edges. The editor includes drag-and-drop functionality, undo/redo operations, and persistent graph storage using a MongoDB backend. This project is built with React for the frontend and Node.js/Express for the backend.

---

## **Features**

### **Core Features**
- Create and delete nodes.
- Create and delete edges by connecting nodes.
- Drag nodes to reposition them.
- Undo and redo functionality for all operations.

### **Bonus Features**
- Unique labels for nodes (e.g., N1, N2, ...).
- Styled nodes and edges with colors and a clean UI.
- Keyboard shortcuts for:
  - Undo (`Ctrl+Z`)
  - Redo (`Ctrl+Y`).

### **Technical Details**
- Real-time updates: Edges move dynamically when nodes are dragged.
- Persistent storage: Graphs are saved and loaded from a MongoDB database.
- RESTful API for CRUD operations on nodes and edges.

---

## **Getting Started**

Follow these steps to set up and run the Graph Editor locally.

### **Prerequisites**
- Node.js and npm installed.
- MongoDB installed and running locally.

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/AnibotTrident/Graph_Editor_final.git
   cd Graph-Editor
