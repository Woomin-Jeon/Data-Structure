const DepthFirstSearch = require('./depthFirstSearch.test.js');

class TopologicalSort extends DepthFirstSearch {
  constructor() {
    super();
    this.alreadyVisited = new Map();
    this.partionVertices = [];
  }

  DFS(startValue) {
    const recursive = (startValue) => {
      const child = this.edges[startValue];

      if(this.alreadyVisited.get(startValue)) {
        return;
      }
      
      this.partionVertices.push(startValue);
      this.alreadyVisited.set(startValue, 'exist');

      if (!child) {
        return;
      }

      child.forEach(c => recursive(c));
    }
    recursive(startValue);
    
    return this.searchPath;
  }

  topologicalSort(vertisces) {
    this.init();

    vertisces.forEach(vertex => {
      this.DFS(vertex)
      this.searchPath.push(...this.partionVertices.reverse());
      this.partionVertices = [];
    });

    return this.searchPath.reverse();
  }

  init() {
    this.searchPath = [];
    this.partionVertices = [];
    this.alreadyVisited = new Map();
  }
}

test('topological sort', () => {
    const graph = new TopologicalSort();

    graph.addDirectedEdge('A', 'B');
    graph.addDirectedEdge('B', 'C');
    graph.addDirectedEdge('D', 'B');
    expect(graph.topologicalSort(['A', 'D'])).toEqual(['D', 'A', 'B', 'C']);

    graph.addDirectedEdge('F', 'B');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C']);

    graph.addDirectedEdge('C', 'E');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C', 'E']);

    graph.addDirectedEdge('C', 'G');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C', 'E', 'G']);

    graph.addDirectedEdge('C', 'H');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C', 'E', 'G', 'H']);

    graph.addDirectedEdge('G', 'H');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C', 'E', 'G', 'H']);

    graph.addDirectedEdge('F', 'C');
    expect(graph.topologicalSort(['A', 'D', 'F'])).toEqual(['F', 'D', 'A', 'B', 'C', 'E', 'G', 'H']);
})

