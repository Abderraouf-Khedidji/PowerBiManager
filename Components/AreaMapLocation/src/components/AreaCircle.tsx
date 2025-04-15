import React from "react";
import { useMqttPosition } from "../hooks/useMqttPosition";

interface AreaCircleProps {
    point: {
        origin_coordsx: number;
        origin_coordsy: number;
        scale: number;
    };
}

export const AreaCircle: React.FC<AreaCircleProps> = ({ point }) => {
    const { position } = useMqttPosition("9427");

    const x = position.x * point.scale + point.origin_coordsx;
    const y = point.origin_coordsy - position.y * point.scale;

    const color = "#FF66CC";
    return (
        <circle
            id="customAreaIcon"
            cx={!isNaN(x) ? x : 400}
            cy={!isNaN(y) ? y : 400}
            fill={color + "90"}
            stroke={color}
            strokeWidth="2"
        ></circle>
    );
};
