/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
declare class Node {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    constructor({ x, y, width, height, color, }: {
        x: number;
        y: number;
        width?: number;
        height?: number;
        color?: string;
    });
    draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * Edge class represents an edge in a graph.
 * @class
 * @property {Node} from - The node the edge is coming from.
 * @property {Node} to - The node the edge is going to.
 */
declare class Edge {
    to: Node;
    from: Node;
    constructor(from: Node, to: Node);
    draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * Graph class represents a graph of nodes and edges.
 * @class
 * @property {Node[]} nodes - The nodes in the graph.
 * @property {Edge[]} edges - The edges in the graph.
 */
declare class Graph {
    nodes: Node[];
    edges: Edge[];
    addNode(node: Node): void;
    addEdge({ from, to }: {
        from: Node;
        to: Node;
    }): void;
    removeNode(node: Node): void;
    removeEdge(edge: Edge): void;
    draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * InfiniteCanvas class represents a canvas that can be infinitely scrolled.
 * @class
 * @property {HTMLCanvasElement}
 * @property {CanvasRenderingContext2D | null}
 * @property {Graph}
 */
declare class InfiniteCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    graph: Graph;
    background: string;
    constructor({ canvas, background, }: {
        canvas: HTMLCanvasElement;
        background?: string;
    });
    /**
     * Add a node to the canvas.
     * @param {Node} node - The node to add.
     */
    addNode({ node }: {
        node: Node;
    }): void;
    /**
     * Remove a node from the canvas.
     * @param {Node} node - The node to remove.
     */
    removeNode({ node }: {
        node: Node;
    }): void;
    /**
     * Add an edge to the canvas.
     * @param {Edge} edge - The edge to add.
     */
    addEdge({ edge }: {
        edge: Edge;
    }): void;
    /**
     * Remove an edge from the canvas.
     * @param {Edge} edge - The edge to remove.
     */
    removeEdge({ edge }: {
        edge: Edge;
    }): void;
    /**
     * Add a background to the canvas.
     */
    private addBackground;
    /**
     * Draw the canvas.
     */
    private draw;
}

export { Edge, Graph, InfiniteCanvas, Node };
