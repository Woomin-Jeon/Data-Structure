const Graph = require('./graph.test.js');

class BreadthFirstSearch extends Graph {
  constructor() {
    super();
    this.bfsQueue = [];
    this.searchPath = [];
  }

  bfsMethod(startVertex) {
    let currentVertex = startVertex;
    this.bfsQueue.push(currentVertex);
    const alreadyVisited = new Map();

    while(this.bfsQueue.length > 0) {    
      if (this.edges[currentVertex]) {
        this.bfsQueue = this.bfsQueue.concat(this.edges[currentVertex]);
      }
      
      if (alreadyVisited.get(currentVertex) !== 1) {
        this.searchPath.push(currentVertex);
        alreadyVisited.set(currentVertex, 1);
      }
      
      this.bfsQueue.shift();
      currentVertex = this.bfsQueue[0];
    }

    this.searchPath.shift();
    const result = this.searchPath.slice();
    this.searchPath = [];

    return result;
  } 
}

describe('breathFirstSearch', () => {
  test('bFS', () => {
    const breathFirstSearch = new BreadthFirstSearch();
    
    breathFirstSearch.addDirectedEdge('A', 'B');
    breathFirstSearch.addDirectedEdge('B', 'D');
    breathFirstSearch.addDirectedEdge('D', 'G');
    breathFirstSearch.addDirectedEdge('B', 'E');
    breathFirstSearch.addDirectedEdge('E', 'H');
    breathFirstSearch.addDirectedEdge('A', 'C');
    breathFirstSearch.addDirectedEdge('C', 'F');
    
    expect(breathFirstSearch.bfsMethod('A')).toEqual(['B', 'C' ,'D', 'E', 'F', 'G', 'H']);
    expect(breathFirstSearch.bfsMethod('B')).toEqual(['D', 'E', 'G', 'H']);

    breathFirstSearch.addDirectedEdge('E', 'C');
    expect(breathFirstSearch.bfsMethod('A')).toEqual(['B', 'C' ,'D', 'E', 'F', 'G', 'H']);
    expect(breathFirstSearch.bfsMethod('E')).toEqual(['H', 'C', 'F']);

    breathFirstSearch.addDirectedEdge('H', 'F');
    expect(breathFirstSearch.bfsMethod('E')).toEqual(['H', 'C', 'F']);
  });
});
