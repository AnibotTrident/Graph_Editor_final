import React from 'react';
import './styles/global.css'; // Global styles
import GraphEditor from './components/GraphEditor'; // GraphEditor component

const App = () => {
  return (
    <div className="App">
      <h1>Graph Editor</h1>
      <GraphEditor />  {/* Add GraphEditor component */}
    </div>
  );
};

export default App;
