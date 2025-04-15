import React, { useEffect, useRef, useState } from "react";
import simpleheat from "simpleheat";

interface HeatmapProps {
    data: {
        x: number;
        y: number;
        total_tags: number;
        plano: number;
        origin_coordsx: number;
        origin_coordsy: number;
        escalex: number;
    }[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
    const [config, setConfig] = useState({
        xOrg: data[0]?.origin_coordsx ?? 0,
        yOrg: data[0]?.origin_coordsy ?? 0,
        escalex: data[0]?.escalex ?? 0,
    });

    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const canvasRef = useRef(null); // Referencia al canvas

    // Mapeo de datos para adaptarlos a las nuevas coordenadas del canvas
    const formatData = () => {
        // Ajuste para el mapeo de las coordenadas
        return data.map((point) => {
            const x = Math.floor(point.x * config.escalex + config.xOrg);
            const y = Math.floor(point.y * -config.escalex + config.yOrg);
            return [x, y, point.total_tags];
        });
    };
    // Calculamos el maximo de calor para ajustar
    const maxTotalTags = Math.max(...formatData().map((point) => point[2]));

    useEffect(() => {
        if (data[0]?.origin_coordsx) {
            setConfig({
                xOrg: data[0].origin_coordsx,
                yOrg: data[0]?.origin_coordsy,
                escalex: data[0]?.escalex,
            });
        }

        const img = new Image();
        img.onload = () => {
            // Ajustar el tamaño del canvas al de la imagen
            setWidth(img.width);
            setHeight(img.height);

            // Establecer la imagen como fondo del canvas
            if (canvasRef.current) {
                canvasRef.current.style.backgroundImage = `url(${img.src})`;
                canvasRef.current.style.backgroundSize = "contain";
                canvasRef.current.style.backgroundRepeat = "no-repeat";
                canvasRef.current.style.backgroundPosition = "center";
            }

            if (canvasRef.current) {
                // Ahora que la imagen está cargada, dibujamos el mapa de calor
                const heatmap = simpleheat(canvasRef.current)
                    .max(maxTotalTags * 0.01) // Establecer el máximo de calor calculado
                    .radius(25)
                    .data(formatData()); // Los datos mapeados

                heatmap.draw();
            }
        };
        if (data[0])
            img.src = `http://localhost:8081/get-svg/${data[0].plano}.svg`;
    }, [data, width, height]);
    return (
        <div id="heatmap-container">
            {data ? (
                <canvas ref={canvasRef} width={width} height={height} />
            ) : (
                <p>NO HAY DATOS</p>
            )}
        </div>
    );
};
