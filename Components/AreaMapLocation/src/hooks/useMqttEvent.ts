import { useEffect, useState } from "react";
import { Event } from "../models/Event.model";
import { useMqttClient } from "./useMqttClient";

export const useMqttEvent = (tag: string) => {
    const MQTT_TOPIC = "CLIENTES/CL3/Events/" + tag;

    const [event, setEvent] = useState<Event>({} as Event);
    const { message } = useMqttClient(MQTT_TOPIC);
    useEffect(() => {
        try {
            const parsedEvent: Event = JSON.parse(message);

            setEvent(parsedEvent);
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    }, [message]);

    return { event, message };
};
