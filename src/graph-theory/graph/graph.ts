import cytoscape, { Core } from "cytoscape";
import { Parser } from "../parser";
import { Node } from "../tree/tree.interface";
import { IEdge, IGraph, IVertex, Visit } from "./graph.interface";

/**
 * (1) Implement IGraph interface
 */
export class Graph {
  cy: Core;
  _rootId: string;

  constructor(tree: Node) {
    /**
     * (2) Use Parser interface to parse tree
     */
    const parsedTree = Parser(tree);
    /**
     * (3) Initialize cytoscape with parsed data
     */
    this.cy = cytoscape({
      elements: {
        nodes: parsedTree.vertices.map((e) => ({
          data: {
            id: e.id,
            name: e.name,
          },
        })),
        edges: parsedTree.edges.map((e) => ({
          data: {
            source: e.source,
            target: e.target,
          },
        })),
      },
    });
    /**
     * (4) Setting id of the root node
     * Since couldn't find any way to get the first root node in cytoscape
     */
    this._rootId = tree.id
  }

  get rootId(): typeof this._rootId {
    return `#${this._rootId}`
  }

  /**
   * (4) Use cytoscape under the hood
   */
  bfs(visit: Visit<IVertex, IEdge>) {
    this.cy.elements().bfs({
      roots: this.rootId,
      visit: function(v, e, u, i, depth){
        const vertex: IVertex = {
          name: v.data().name,
          id: v.id(),
        } 
        const firstEdge = v.connectedEdges().first()
        const edge: IEdge = {
          target: firstEdge.target().id(),
          source: firstEdge.source().id(),
        } 
        visit(vertex, edge)
      }
    })
  }

  /**
   * (5) Use cytoscape under the hood
   */
  dfs(visit: Visit<IVertex, IEdge>) {
    this.cy.elements().dfs({
      roots: this.rootId,
      visit: function(v, e, u, i, depth){
        const vertex: IVertex = {
          name: v.data().name,
          id: v.id(),
        } 
        const firstEdge = v.connectedEdges().first()
        const edge: IEdge = {
          target: firstEdge.target().id(),
          source: firstEdge.source().id(),
        } 
        visit(vertex, edge)
      }
    })
  }
}
