const DepthFirstSearch = require('./depthFirstSearch.test.js');
/*
 이해:
  위상정렬은 선수 vertex들을 다 마치고 다음 vertex들을 갈 수 있는 정렬 방식
  
  조건은 DAG(Directed Acyclic Graph) 
   - 사이클이 없어야한다. 
   - 모든건 방향을 가져야 한다.

  계획:
  매개변수의 vertex에 edge가 들어오는지 확인 하고 있다면 에러 발생.

  위상 정렬을 할때 dfs 를 쓸거다. completed 된 값을 지정 하고 그 지정된 completed
   vertex들을 reverse 해서 넣는다. 

  위상정렬 하면서 dag를 확인하는데
   - dag를 확인할때 중복되는 vertex들이 나오면 cycle이므로 에러를 발생시킨다.

*/
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

