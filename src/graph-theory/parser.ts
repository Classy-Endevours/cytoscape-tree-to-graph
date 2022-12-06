import { GraphData, IEdge, IVertex } from './graph/graph.interface'
import { Node, Tree } from './tree/tree.interface'

export const Parser = (tree: Node, graph?: GraphData, parent?: Node): GraphData => {
    const root: IVertex = {
        id: tree.id,
        name: tree.name
    }

    const vertices: IVertex[] = []
    const edges: IEdge[] = []
    vertices.push(root)

    for(const child of tree.children){
        const edge: IEdge = {
            source: tree.id,
            target: child.id
        }
        edges.push(edge)
    }
    let currentGraph: GraphData
    if(!graph) {
        currentGraph = {
            vertices,
            edges
        }
    } else {
        currentGraph = graph
        currentGraph.edges.push(...edges)
        currentGraph.vertices.push(...vertices)
    }

    for(const child of tree.children){
        Parser(child, currentGraph)
    }

    return currentGraph
}

