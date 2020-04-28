/*
이해한것 
- addVertex : this.vertices에 vertex를 추가한다
- addEdge : this.edges에 edge를 추가할것인데 형식은 "A에 B가 연결되어있다" [{"이태원": 한강진, 녹사평}]
- addDirectedEdge : 방향이있는 연결 방향이 있는 쪽으로만 갈 수 있다.
- hasVertex: 버텍스가 있는지 확인한다.
- isConnected: 연결되어있는지 확인한다.
- getGragh: 연결상태를 반환한다.
*/
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
      return;
    }

    this.edges[from].push(to);
  }

  getGragh() {
    return this.vertices.map(v => `${v} => ${this.edges[v]}`);
  }
}


describe('Graph', () => {
  test('addVertex', () => {
    const graph = new Graph();

    graph.addVertex('A');
    graph.addVertex('A');
    expect(graph.vertices.length).toBe(1);

    expect(graph.hasVertex('A')).toBe(true);
    expect(graph.hasVertex('B')).toBe(false);
  });

  test('hasVertex', () => {
    const graph = new Graph();

    graph.addVertex('A');
 
    expect(graph.hasVertex('A')).toBe(true);
    expect(graph.hasVertex('B')).toBe(false);
  });

  test('addEdge', () => {
    const graph = new Graph();

    graph.addEdge('A', 'B');
    expect(graph.isConnected('A', 'B')).toBe(true);
    expect(graph.isConnected('A', 'C')).toBe(false);
    expect(graph.isConnected('B', 'A')).toBe(true);


    graph.addEdge('A', 'C');
    expect(graph.isConnected('A', 'B')).toBe(true);
    expect(graph.isConnected('A', 'C')).toBe(true);
    expect(graph.isConnected('C', 'A')).toBe(true);
  });
  
  test('addDirectedEdge', () => {
    const graph = new Graph();

    graph.addDirectedEdge('A', 'B');
    expect(graph.isConnected('A', 'B')).toBe(true);
    expect(graph.isConnected('B', 'A')).toBe(false);

    expect(()=> graph.addDirectedEdge('B', 'A')).toThrowError('error');
  });

  test('getGraph', () => {
    const graph = new Graph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'A');
    graph.addEdge('C', 'F');
    graph.addEdge('A', 'C');
    graph.addEdge('C', 'A');

    expect(graph.getGragh()).toEqual([
      "A => B,C",
      "B => A",
      "C => F,A",
      "F => C"
    ]);
  });
});
