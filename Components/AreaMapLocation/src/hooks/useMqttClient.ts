import { useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

const MQTT_BROKER_URL = "wss://battodev.deustosistemas.net/mqtt/"; // Servidor MQTT
const MQTT_OPTIONS = {
    username: "juan", // 🔐 Agrega tu usuario
    password: "juan", // 🔐 Agrega tu contraseña
    rejectUnauthorized: true, // 🚨 Úsalo solo si el certificado es autofirmado
};

export const useMqttClient = (MQTT_TOPIC: string) => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [message, setMessages] = useState<string>("");
    useEffect(() => {
        const mqttClient = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);
        //console.log("ENV: ", process.env.MQTT_URL);

        mqttClient.on("connect", () => {
            console.log("✅ Conectado a MQTT");
            mqttClient.subscribe(MQTT_TOPIC, (err) => {
                if (!err) {
                    console.log(`📡 Suscrito a ${MQTT_TOPIC}`);
                } else {
                    console.error("❌ Error en la suscripción:", err);
                }
            });
        });

        mqttClient.on("message", (topic, newMessage) => {
            setMessages(newMessage.toString());
        });

        mqttClient.on("error", (error) => {
            console.error("❌ Error en MQTT:", error);
        });

        setClient(mqttClient);
        return () => {
            mqttClient.end();
        };
    }, [MQTT_TOPIC]);
    useEffect(() => {
        const interval = setInterval(() => {
            setMessages((prevMessage) => message);
        }, 300);

        return () => {
            clearInterval(interval);
        };
    }, [message]);

    return { message };
};
