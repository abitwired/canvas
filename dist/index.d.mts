interface INode {
    /**
     * The unique identifier of the node.
     */
    id: string;
    /**
     * The x coordinate of the node.
     */
    x: number;
    /**
     * The y coordinate of the node.
     */
    y: number;
    /**
     * The width of the node.
     */
    width: number;
    /**
     * The height of the node.
     */
    height: number;
    /**
     * The color of the node.
     */
    color: string;
    /**
     * True if the node is being hovered over, false otherwise.
     */
    isHovered: boolean;
    /**
     * True if the node is being dragged, false otherwise.
     */
    isDragging: boolean;
    /**
     * Draw the node on the canvas.
     * @param ctx - The 2D rendering context of the canvas.
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * Handle the hover event on the node.
     */
    hoverOn(): void;
    /**
     * Handle the mouse off hover event on the node.
     */
    hoverOff(): void;
    /**
     * Handle the drag start event on the node.
     * @param x - The x coordinate of the mouse.
     * @param y - The y coordinate of the mouse.
     */
    onDragStart(x: number, y: number): void;
    /**
     * Handle the drag event on the node.
     * @param x - The x coordinate of the mouse.
     * @param y - The y coordinate of the mouse.
     */
    onDrag(x: number, y: number): void;
    /**
     * Handle the drop event on the node.
     */
    onDragEnd(): void;
    /**
     * Check if the node contains a point.
     * @param x - The x coordinate of the point.
     * @param y - The y coordinate of the point.
     * @returns True if the node contains the point, false otherwise.
     */
    containsPoint(x: number, y: number): boolean;
}
/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
declare class Node implements INode {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    isHovered: boolean;
    isDragging: boolean;
    dragOffsetX: number;
    dragOffsetY: number;
    constructor({ id, x, y, width, height, color, }: {
        id: string;
        x: number;
        y: number;
        width?: number;
        height?: number;
        color?: string;
    });
    /**
     * Sets the drag start position for the node.
     * @param x - The x-coordinate of the drag start position.
     * @param y - The y-coordinate of the drag start position.
     */
    onDragStart(x: number, y: number): void;
    /**
     * Resets the drag offset after dragging ends.
     */
    onDragEnd(): void;
    /**
     * Updates the node position while dragging.
     * @param x - The x-coordinate of the drag position.
     * @param y - The y-coordinate of the drag position.
     */
    onDrag(x: number, y: number): void;
    hoverOn(): void;
    hoverOff(): void;
    static createId(): string;
    containsPoint(x: number, y: number): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * Edge class represents an edge in a graph.
 * @class
 * @property {Node} from - The node the edge is coming from.
 * @property {Node} to - The node the edge is going to.
 */
declare class Edge {
    to: INode;
    from: INode;
    constructor(from: INode, to: INode);
    draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * Graph class represents a graph of nodes and edges.
 * @class
 * @property {INode[]} nodes - The nodes in the graph.
 * @property {Edge[]} edges - The edges in the graph.
 */
declare class Graph {
    nodes: INode[];
    edges: Edge[];
    addNode(node: INode): void;
    addEdge({ from, to }: {
        from: INode;
        to: INode;
    }): void;
    removeNode(node: INode): void;
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
     * Flag indicating whether a node is being dragged.
     */
    private isDragging;
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
        node: INode;
    }): void;
    /**
     * Removes a node from the canvas.
     * @param options - The options for removing a node.
     */
    removeNode({ node }: {
        node: INode;
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
     * Handles the hover event on the canvas.
     * @param event - The mouse event.
     */
    private hover;
    /**
     * Handles the drag event on the canvas.
     * @param event - The mouse event.
     */
    private drag;
    /**
     * Handles the end of dragging.
     */
    private dragEnd;
    /**
     * Handles the click event on the canvas.
     * @param event - The mouse event.
     */
    private startDrag;
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
     * Gets the mouse position on the canvas.
     *
     * @param evt - The mouse event object.
     * @returns An object containing the x and y coordinates of the mouse.
     */
    private getMouseCoordinates;
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

export { Edge, Graph, type INode, InfiniteCanvas, Node, Serializer };
