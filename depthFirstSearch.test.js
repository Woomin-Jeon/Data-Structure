const Graph = require('./graph.test.js');

class DepthFirstSearch extends Graph {
  constructor() {
    super();
    this.searchPath = [];
  }

  dfsMethod(startValue) {
    const alreadyVisited = new Map();

    const recursive = (startValue) => {
      const child = this.edges[startValue];

      if(alreadyVisited.get(startValue)) {
        return;
      }

      this.searchPath.push(startValue);
      alreadyVisited.set(startValue, 'exist');

      if (!child) {
        return;
      }

      for (let i = 0; i < child.length; i++) {
        recursive(child[i]);
      }
    }
    recursive(startValue);

    const result = this.searchPath;
    this.searchPath = [];
    return result;
  }
}

describe('depthFirstSearch', () => {
  describe('with existent direction', () => {
    it('returns search path', () => {
      const depthFirstSearch = new DepthFirstSearch();

      depthFirstSearch.addDirectedEdge('A', 'B');
      depthFirstSearch.addDirectedEdge('B', 'D');
      depthFirstSearch.addDirectedEdge('D', 'G');
      depthFirstSearch.addDirectedEdge('B', 'E');
      depthFirstSearch.addDirectedEdge('E', 'H');
      depthFirstSearch.addDirectedEdge('A', 'C');
      depthFirstSearch.addDirectedEdge('C', 'F');
      
      expect(depthFirstSearch.dfsMethod('A')).toEqual(['A', 'B', 'D' ,'G', 'E', 'H', 'C', 'F']);
      expect(depthFirstSearch.dfsMethod('B')).toEqual(['B', 'D', 'G' ,'E', 'H']);

      depthFirstSearch.addDirectedEdge('E', 'C');
      expect(depthFirstSearch.dfsMethod('B')).toEqual(['B', 'D', 'G' ,'E', 'H', 'C', 'F']);
    });
  });
  
  describe('with unexistent direction', () => {
    it('returns search path', () => {
      const depthFirstSearch = new DepthFirstSearch();

      depthFirstSearch.addEdge('A', 'B');
      depthFirstSearch.addEdge('B', 'D');
      depthFirstSearch.addEdge('D', 'G');
      depthFirstSearch.addEdge('B', 'E');
      depthFirstSearch.addEdge('E', 'H');
      depthFirstSearch.addEdge('A', 'C');
      depthFirstSearch.addEdge('C', 'F');

      expect(depthFirstSearch.dfsMethod('A')).toEqual(['A', 'B', 'D' ,'G', 'E', 'H', 'C', 'F']);
      expect(depthFirstSearch.dfsMethod('D')).toEqual(['D', 'B', 'A', 'C', 'F', 'E', 'H', 'G']);
      
      depthFirstSearch.addEdge('E', 'C')
      expect(depthFirstSearch.dfsMethod('D')).toEqual(['D', 'B', 'A', 'C', 'F', 'E', 'H', 'G']);
      depthFirstSearch.addEdge('H', 'F')
      expect(depthFirstSearch.dfsMethod('D')).toEqual(['D', 'B', 'A', 'C', 'F', 'E', 'H', 'G']);
      depthFirstSearch.addEdge('F', 'G')
      expect(depthFirstSearch.dfsMethod('D')).toEqual(['D', 'B', 'A', 'C', 'F', 'G', 'E', 'H']);
    });
  });
});
