import React from "react";
const MqttComponent = ({ stepAreaId, realAreaId }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold">MQTT en React</h2>
            <span className="border-b p-2">{realAreaId}</span>
        </div>
    );
};

export default MqttComponent;
