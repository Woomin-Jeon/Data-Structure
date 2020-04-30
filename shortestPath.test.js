class Graph {
  constructor() {
    this.edges = {};
    this.vertices = [];
  }

  addVertex(value) {
    if (this.hasVertex(value)) {
      return;
    }
    this.vertices.push(value);
  };

  hasVertex(value) {
    return this.vertices.includes(value);
  }

  addEdge(vertex1, vertex2) {
    if (!this.edges[vertex1]) {
      this.edges[vertex1] = [vertex2];
      this.edges[vertex2] = [vertex1];
      this.vertices.push(vertex1);
      this.vertices.push(vertex2);

      if (this.edges[vertex1].includes(vertex2)) {
        return;
      }

      if (!this.edges[vertex2]) {
        this.edges[vertex2] = [vertex1];
        this.vertices.push(vertex2);
        return;
      }

      this.edges[vertex2].push(vertex1);
    }
    
    if (!this.edges[vertex1].includes(vertex2)) {
      this.edges[vertex1].push(vertex2);
    }
    
    if (!this.edges[vertex2]) {
      this.edges[vertex2] = [vertex1];
      this.vertices.push(vertex2);
      return;
    }
  }

  isConnected(from , to) {
    return this.edges[from] ? this.edges[from].includes(to) : false;
  }

  addDirectedEdge(from, to) {
    if (this.isConnected(to, from)) {
      throw new Error('error');
    }

    if (!this.edges[from]) {
      this.edges[from] = [to];
      if (!this.vertices.includes(from)) {
        this.vertices.push(from);
      }
      return;
    }

    this.edges[from].push(to);
    if (!this.vertices.includes(from)) {
      this.vertices.push(from);
    }
  }

  getGragh() {
    return this.vertices.map(v => `${v} => ${this.edges[v]}`);
  }

  childExistenceOf(vertex) {
    return !!this.edges[vertex.key];
  }

  shortestPath(startVertex, target) {
    let bfsQueue = [];
    let searchPath = [];
    const alreadyVisited = new Map();
    const result = [];
    let currentVertex = { key: startVertex, parent: null };
    
    bfsQueue.push(currentVertex);
   
    while(bfsQueue.length > 0) {    
      if (this.childExistenceOf(currentVertex)) {
        bfsQueue = bfsQueue.concat(this.edges[currentVertex.key]
          .map(vertex => ({ key: vertex, parent: currentVertex })));
      }

      if (!alreadyVisited.get(currentVertex)) {
        searchPath.push(currentVertex);
        alreadyVisited.set(currentVertex, 1);  
      }
      
      const lastVertexOfSearchPath = searchPath[searchPath.length - 1];
      if (lastVertexOfSearchPath.key === target) {
        let searchTarget = lastVertexOfSearchPath;
        
        while (searchTarget !== null) {
          result.push(searchTarget.key);
          searchTarget = searchTarget.parent;
        }

        return result.reverse();
      }

      bfsQueue.shift();
      currentVertex = bfsQueue[0];
    }
  }
}


test('shortestPath', () => {
  const graph = new Graph();
  const edges = [
    ['A', 'B'], ['A', 'D'], ['B', 'E'], ['D', 'E'],
    ['D', 'F'], ['B', 'C'], ['E', 'G'], ['F', 'E'],
    ['F', 'G'], ['C', 'G'], ['E', 'C']
  ];

  edges.forEach(([from, to]) => {
    graph.addDirectedEdge(from, to);
  });

  /*
    B - C
   / \ / \
  A   E - G
   \ / \ /
    D - F
  */

  expect(graph.shortestPath('A', 'E')).toEqual(['A', 'B', 'E']);
  expect(graph.shortestPath('A', 'C')).toEqual(['A', 'B', 'C']);
  expect(graph.shortestPath('A', 'G')).toEqual(['A', 'B', 'E', 'G']);
});
