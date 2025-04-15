import React, { useEffect, useRef, useState } from "react";
import { AreaPolygon } from "./AreaPolygon";

interface AreamapProps {
    data: {
        x: number;
        y: number;
        total_tags: number;
        area_id: number;
        plano: number;
        origin_coordsx: number;
        origin_coordsy: number;
        area_type: string;
    }[];
}

export const Areamap: React.FC<AreamapProps> = ({ data }) => {
    const [config, setConfig] = useState({
        xOrg: data[0]?.origin_coordsx ?? 0,
        yOrg: data[0]?.origin_coordsy ?? 0,
    });
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const svgRef = useRef(null); // Referencia al svg

    useEffect(() => {
        if (data[0]?.origin_coordsx) {
            setConfig({
                xOrg: data[0].origin_coordsx,
                yOrg: data[0]?.origin_coordsy,
            });
        }

        const img = new Image();
        img.onload = () => {
            // Ajustar el tamaño del svg al de la imagen
            setWidth(img.width);
            setHeight(img.height);

            // Establecer la imagen como fondo del svg
            svgRef.current.style.backgroundImage = `url(${img.src})`;
            svgRef.current.style.backgroundSize = "contain";
            svgRef.current.style.backgroundRepeat = "no-repeat";
            svgRef.current.style.backgroundPosition = "center";

            if (svgRef.current) {
            }
        };
        if (data[0])
            img.src = `http://localhost:8081/get-svg/${data[0].plano}.svg`;
    }, [data, width, height]);

    const customData = data.filter((point) => point.area_id == 960);
    const groupedData = data.reduce((result, point) => {
        const existingGroup = result.find(
            (group) => group.area_id === point.area_id
        );

        if (existingGroup) {
            existingGroup.points.push(point);
        } else {
            result.push({ area_id: point.area_id, points: [point] });
        }

        return result;
    }, []);

    return (
        <div id="areamap-container">
            {data ? (
                <>
                    <svg
                        ref={svgRef}
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                    >
                        {groupedData?.map((area) => {
                            return <AreaPolygon points={area.points} />;
                        })}
                    </svg>
                </>
            ) : (
                "NO HAY DATOS"
            )}
        </div>
    );
};
