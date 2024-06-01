/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
declare class Node {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    constructor({ id, x, y, width, height, color, }: {
        id: string;
        x: number;
        y: number;
        width?: number;
        height?: number;
        color?: string;
    });
    static createId(): string;
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
 * The Serializer class provides methods to serialize and deserialize a graph.
 */
declare class Serializer {
    /**
     * Serialize the graph to a JSON string.
     * @param graph - The graph to serialize.
     * @returns A JSON string representing the graph.
     */
    static serialize(graph: Graph): string;
    /**
     * Deserialize a JSON string to a graph.
     * @param data - The JSON string representing the graph.
     * @returns The deserialized graph.
     */
    static deserialize(data: string): Graph;
}

/**
 * InfiniteCanvas class represents a canvas that can be infinitely scrolled.
 * @class
 * @property {HTMLCanvasElement}
 * @property {CanvasRenderingContext2D}
 * @property {Graph}
 */
declare class InfiniteCanvas {
    /**
     * The HTML canvas element.
     */
    private canvas;
    /**
     * The 2D rendering context of the canvas.
     */
    private ctx;
    /**
     * The graph to be drawn on the canvas.
     */
    private graph;
    /**
     * The background color of the canvas.
     */
    private background;
    /**
     * The scale factor for zooming.
     */
    private scale;
    /**
     * The X offset for panning.
     */
    private offsetX;
    /**
     * The Y offset for panning.
     */
    private offsetY;
    /**
     * Flag indicating whether panning is in progress.
     */
    private isPanning;
    /**
     * The starting X coordinate for panning.
     */
    private startX;
    /**
     * The starting Y coordinate for panning.
     */
    private startY;
    /**
     * Creates a new instance of InfiniteCanvas.
     * @param options - The options for creating the canvas.
     */
    constructor({ canvas, background, }: {
        canvas: HTMLCanvasElement;
        background?: string;
    });
    /**
     * Sets the graph to be drawn on the canvas.
     * @param graph - The graph to be set.
     */
    setGraph(graph: Graph): void;
    /**
     * Adds a node to the canvas.
     * @param options - The options for adding a node.
     */
    addNode({ node }: {
        node: Node;
    }): void;
    /**
     * Removes a node from the canvas.
     * @param options - The options for removing a node.
     */
    removeNode({ node }: {
        node: Node;
    }): void;
    /**
     * Adds an edge to the canvas.
     * @param options - The options for adding an edge.
     */
    addEdge({ edge }: {
        edge: Edge;
    }): void;
    /**
     * Removes an edge from the canvas.
     * @param options - The options for removing an edge.
     */
    removeEdge({ edge }: {
        edge: Edge;
    }): void;
    /**
     * Resizes the canvas to fit the window size.
     */
    private resizeCanvas;
    /**
     * Handles the start of panning.
     * @param event - The mouse event.
     */
    private startPan;
    /**
     * Handles panning.
     * @param event - The mouse event.
     */
    private pan;
    /**
     * Handles the end of panning.
     */
    private endPan;
    /**
     * Handles zooming.
     * @param event - The wheel event.
     */
    private zoom;
    /**
     * Draws the background grid on the canvas.
     */
    private drawBackground;
    /**
     * Draws the canvas.
     */
    private draw;
}

export { Edge, Graph, InfiniteCanvas, Node, Serializer };
