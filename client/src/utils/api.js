export const fetchGraph = async (graphId) => {
    try {
      const response = await fetch(`/api/graph/${graphId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching graph:', error);
      throw error;
    }
  };
  
  export const saveGraph = async (graph) => {
    try {
      const response = await fetch('/api/graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graph),
      });
      if (!response.ok) {
        throw new Error('Failed to save graph');
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving graph:', error);
      throw error;
    }
  };
  