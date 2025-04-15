import React, { useEffect, useRef, useState } from "react";
import { AreaPolygon } from "./AreaPolygon";
import { dataViewToAreaMapData } from "../connectors/dataview-areaMapData.connector";
import { AreaMapData } from "../models/AreaMapData.model";
import { AreaCircle } from "../components/AreaCircle";

interface AreamapProps {
    dataView;
}

export const AreaMap: React.FC<AreamapProps> = ({ dataView }) => {
    const { table } = dataView;

    const areaMapData: AreaMapData[] = dataViewToAreaMapData(table);

    const [config, setConfig] = useState({
        xOrg: areaMapData[0]?.origin_coordsx ?? 0,
        yOrg: areaMapData[0]?.origin_coordsy ?? 0,
    });
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const svgRef = useRef(null); // Referencia al svg

    useEffect(() => {
        if (areaMapData[0]?.origin_coordsx) {
            setConfig({
                xOrg: areaMapData[0].origin_coordsx,
                yOrg: areaMapData[0]?.origin_coordsy,
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
        if (areaMapData[0])
            img.src = `http://localhost:8081/get-svg/${areaMapData[0].plano}.svg`;
    }, [areaMapData, width, height]);

    const groupedData = areaMapData.reduce((result, point) => {
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
    const pointRef = groupedData ? groupedData[0].points[0] : {};

    return (
        <div id="areamap-container">
            {areaMapData ? (
                <>
                    {/* <span id="position-icon"></span> */}
                    <svg
                        ref={svgRef}
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                    >
                        {groupedData?.map((area) => {
                            return <AreaPolygon points={area.points} />;
                        })}

                        <AreaCircle point={{ ...pointRef }} />
                    </svg>
                </>
            ) : (
                "NO HAY DATOS"
            )}
        </div>
    );
};
