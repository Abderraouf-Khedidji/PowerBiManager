import React, { useCallback, useEffect, useState } from "react";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node as FlowNode,
    Edge as FlowEdge,
    Connection,
    OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useMqttEvent } from "./hooks/useMqttEvent";

interface DataView {
    table: {
        rows: any[];
    };
}

interface Tooltip {
    visible: boolean;
    content: string;
    x: number;
    y: number;
}

interface CustomNodeData extends Record<string, unknown> {
    label: string;
    tmin: number;
    tmax: number;
    tavg: number;
    tooltip?: string;
    hasTag?: boolean;
    areaId?: string; // Make sure areaId is defined
}

interface CustomEdgeData extends Record<string, unknown> {
    animated?: boolean;
}

const getNodesAndEdgesFromData = (dataView: DataView) => {
    if (!dataView || !dataView.table || !dataView.table.rows)
        return { nodes: [], edges: [] };

    type Node = FlowNode<CustomNodeData>;
    type Edge = FlowEdge<CustomEdgeData>;

    const stepNodes = new Map<string, Node>();
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const orderedRows = dataView.table.rows.sort((a, b) =>
        a[6].localeCompare(b[6])
    );

    orderedRows.forEach((row, index) => {
        const processName = row[0];
        const processId = row[1].toString();
        const stepName = row[6];
        const stepId = `step-${stepName}`;
        const tmin = row[4];
        const tmax = row[5];
        const tavg = (tmin + tmax) / 2;
        const hasTag = index % 2 === 0; // Simulate tags for every other step
        const areaId = row[7]?.toString() || "";

        if (!stepNodes.has(stepId)) {
            stepNodes.set(stepId, {
                id: stepId,
                position: { x: index * 300, y: 100 },
                data: {
                    label: `${
                        stepName.charAt(0).toUpperCase() + stepName.slice(1)
                    }`,
                    tmin: 0,
                    tmax: 0,
                    tavg: 0,
                    hasTag,
                    areaId,
                },
            });
        }

        const stepNode = stepNodes.get(stepId)!;
        stepNode.data.tmin += tmin;
        stepNode.data.tmax += tmax;
        stepNode.data.tavg = (stepNode.data.tmin + stepNode.data.tmax) / 2;

        const processNode: Node = {
            id: processId,
            position: { x: index * 300, y: 250 },
            data: {
                label: processName,
                tmin,
                tmax,
                tavg,
                tooltip: `Tiempo Minimo: ${tmin} \nTiempo Medio: ${tavg} \nTiempo Maximo: ${tmax}`,
                areaId, // Add areaId to process nodes too
            },
        };
        nodes.push(processNode);

        edges.push({
            id: `e${stepId}-${processId}`,
            source: stepId,
            target: processId,
        });
    });

    // Change here: Initialize all edges as not animated
    const stepIds = [...stepNodes.keys()];
    for (let i = 0; i < stepIds.length - 1; i++) {
        edges.push({
            id: `e${stepIds[i]}-${stepIds[i + 1]}`,
            source: stepIds[i],
            target: stepIds[i + 1],
            animated: false, // Default to not animated
        });
    }

    stepNodes.forEach((stepNode) => {
        stepNode.data.tooltip = `Tiempo Minimo: ${stepNode.data.tmin} \nTiempo Medio: ${stepNode.data.tavg} \nTiempo Maximo: ${stepNode.data.tmax}`;
        nodes.push(stepNode);
    });

    return { nodes, edges };
};

interface AppProps {
    dataView: DataView;
}

const App: React.FC<AppProps> = ({ dataView }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<
        FlowNode<CustomNodeData>
    >([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<
        FlowEdge<CustomEdgeData>
    >([]);
    const [tooltip, setTooltip] = useState<Tooltip>({
        visible: false,
        content: "",
        x: 0,
        y: 0,
    });
    const [seconds, setSeconds] = useState(0);

    const { event, message } = useMqttEvent("9427");

    // Add a style element with keyframes animation
    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
                }
                50% {
                    box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.6);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
                }
            }
        `;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // Initial setup
    useEffect(() => {
        if (dataView) {
            const { nodes, edges } = getNodesAndEdgesFromData(dataView);
            setNodes(nodes);
            setEdges(edges);
        }
    }, [dataView]);

    // Effect to update edge animation based on event area ID
    useEffect(() => {
        if (!event?.areaid) return;

        const realAreaId = event.areaid.toString();

        setEdges((currentEdges) =>
            currentEdges.map((edge) => {
                // Only process step-to-step edges (horizontal connections between workflow steps)
                if (
                    edge.source.startsWith("step-") &&
                    edge.target.startsWith("step-")
                ) {
                    // Find the source node to get its areaId
                    const sourceNode = nodes.find(
                        (node) => node.id === edge.source
                    );
                    if (sourceNode && sourceNode.data.areaId) {
                        // Animate the edge only if the source node's area ID matches the event's area ID
                        return {
                            ...edge,
                            animated:
                                sourceNode.data.areaId.toString() ===
                                realAreaId,
                        };
                    }
                }
                return edge;
            })
        );
    }, [event, nodes]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const onConnect: OnConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleMouseEnter = (
        event: React.MouseEvent,
        node: FlowNode<CustomNodeData>
    ) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setTooltip({
            visible: true,
            content: node.data.tooltip!,
            x: rect.x + rect.width / 2,
            y: rect.y - 10,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, content: "", x: 0, y: 0 });
    };

    const nodesReactFlow = nodes.map((node) => {
        // JS
        const nodeAreaId = node.data.areaId;
        const realAreaId = event?.areaid;

        const isActive = realAreaId && nodeAreaId === realAreaId.toString();
        const backgroundStyle = isActive ? "#ff9999" : "#99ff99";

        if (node.id.startsWith("step-")) {
            return {
                ...node,
                style: {
                    backgroundColor: backgroundStyle,
                    color: "black",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid black",
                    // Add pulsing animation only to active nodes
                    ...(isActive
                        ? {
                              animation: "pulse 1.5s infinite ease-in-out",
                              boxShadow: "0 0 10px 5px rgba(255, 0, 0, 0.6)",
                          }
                        : {}),
                    transition: "background-color 0.3s ease", // Smooth color transitions
                },
            };
        }
        return node;
    });

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <ReactFlow
                nodes={nodesReactFlow}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeMouseEnter={handleMouseEnter}
                onNodeMouseLeave={handleMouseLeave}
            ></ReactFlow>
            {tooltip.visible && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltip.y,
                        left: tooltip.x,
                        transform: "translate(-50%, -100%)",
                        background: "rgba(0, 0, 0, 0.75)",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        pointerEvents: "none",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};

export default App;