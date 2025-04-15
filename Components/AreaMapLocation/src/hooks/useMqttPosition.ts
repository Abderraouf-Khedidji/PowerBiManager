import { useEffect, useState } from "react";
import { Position } from "../models/Position.model";
import { useMqttClient } from "./useMqttClient";

export const useMqttPosition = (tag: string) => {
    const MQTT_TOPIC = "CLIENTES/CL3/Positions/gateway_1/" + tag;

    const [position, setPosition] = useState<Position>({} as Position);
    const { message } = useMqttClient(MQTT_TOPIC);
    useEffect(() => {
        try {
            // console.log(message);
            const parsedPostion: Position = JSON.parse(message);

            setPosition(parsedPostion);
        } catch (error) {
            console.error("Error parsing message in position MQTT:");
        }
    }, [message]);

    return { position, message };
};
