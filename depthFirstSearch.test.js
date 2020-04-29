const Graph = require('./graph.test.js');

class DepthFirstSearch extends Graph {
  constructor() {
    super();
    this.searchPath = [];
  }

  dfsMethod(startValue) {
    const recursive = (startValue) => {
      const child = this.edges[startValue];
      if(!child) {
        return;
      }
      this.searchPath.push(startValue);
      for(let i = 0; i<child.length; i++) {
        recursive(child[i]);
      }
    }
    recursive(startValue);

    this.searchPath.shift();
    const result = this.searchPath;
    this.searchPath = [];
    return result;
  }
}

describe('depthFirstSearch', () => {
  test('dFS', () => {
    const depthFirstSearch = new DepthFirstSearch();

    depthFirstSearch.addDirectedEdge('A', 'B');
    depthFirstSearch.addDirectedEdge('B', 'D');
    depthFirstSearch.addDirectedEdge('D', 'G');
    depthFirstSearch.addDirectedEdge('B', 'E');
    depthFirstSearch.addDirectedEdge('E', 'H');
    depthFirstSearch.addDirectedEdge('A', 'C');
    depthFirstSearch.addDirectedEdge('C', 'F');
    
    expect(depthFirstSearch.dfsMethod('A')).toEqual(['B', 'D' ,'G', 'E', 'H', 'C', 'F']);
    // expect(depthFirstSearch.dfsMethod('B')).toEqual(['D', 'G' ,'E', 'H']);
  });
});




























// const recursive = (startValue) => {
//       const child = this.edges[startValue];
//       this.searchPath.push(startValue);
  
//       if (!child) {
//         return ;
//       }

//       for (let i = 0; i < child.length; i++) {
//         recursive(child[i]);
//       }
//     }
//     recursive(startValue);

    // this.searchPath.shift();
    // const result = this.searchPath;
    // this.searchPath = [];
    // return result;