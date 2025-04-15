import React, { useEffect, useState } from "react";

interface AreaPolygonProps {
    points: any[]; // Puntos de la forma
}

export const AreaPolygon: React.FC<AreaPolygonProps> = ({ points }) => {
    // Convertimos los puntos a un formato adecuado para el atributo "points" de un <polygon>
    const [polygonPoints, setPolygonPoints] = useState("");

    useEffect(() => {
        const type = points[0]?.area_type;

        switch (type) {
            case "rect":
                setPolygonPoints(
                    points
                        .sort((a, b) => a.sort_order - b.sort_order) // Ordenar por sort_order de menor a mayor
                        .map(
                            (point) =>
                                `${Math.floor(point.x)},${Math.floor(point.y)}`
                        )
                        .join(" ")
                );

                break;
            default:
                setPolygonPoints(
                    points
                        .sort((a, b) => a.sort_order - b.sort_order) // Ordenar por sort_order de menor a mayor
                        .map(
                            (point) =>
                                `${Math.floor(point.x)},${Math.floor(point.y)}`
                        )
                        .join(" ")
                );

                break;
        }
    }, [points]);

    return (
        <polygon
            className="customArea"
            points={polygonPoints}
            fill={points[0].color + "80"}
            stroke={points[0].color}
            strokeWidth="2"
        >
            <title
                style={{
                    background: "white",
                    borderRadius: "8px",
                    color: "black",
                }}
            >{`Area: ${points[0].label}`}</title>
        </polygon>
    );
};
