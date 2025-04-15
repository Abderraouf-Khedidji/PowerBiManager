import * as React from "react";
import { useMqttEvent } from "../src/hooks/useMqttEvent";
import MqttComponent from "./MqttComponent";

interface WorkFlowStep {
    id: string;
    areaId: string;
    name: string;
    tmin: number;
    tmax: number;
    tavg: number;
}

interface WorkFlowGraphProps {
    steps: WorkFlowStep[];
}

export const WorkFlowGraph: React.FC<WorkFlowGraphProps> = ({ steps }) => {
    const { event, message } = useMqttEvent("1DA1");

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <React.Fragment>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {steps.length}
                    {steps.map((step: WorkFlowStep, index) => (
                        <div>
                            <MqttComponent
                                stepAreaId={step.areaId}
                                realAreaId={event.areaid}
                            />
                            <div>
                                {step.name}
                                <div
                                    style={{
                                        border: "2px solid black",
                                        padding: "10px",
                                        margin: "10px",
                                        textAlign: "center",
                                        position: "relative",
                                    }}
                                >
                                    <div>tmin: {step.tmin}</div>
                                    <div>tmax: {step.tmax}</div>
                                    <div>tavg: {step.tavg}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {steps.map((step, index) => (
                        <div>
                            {index < steps.length - 1 && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "2px",
                                            backgroundColor: "black",
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "0",
                                            height: "0",
                                            borderLeft: "10px solid black",
                                            borderTop: "5px solid transparent",
                                            borderBottom:
                                                "5px solid transparent",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </React.Fragment>
            {/* {steps.map((step, index) => (
        
        // <React.Fragment key={step.id}>
        //   <div
        //     style={{
        //       border: "2px solid black",
        //       padding: "10px",
        //       margin: "10px",
        //       textAlign: "center",
        //       position: "relative",
        //     }}
        //   >
        //     <div>{step.name}</div>
        //     <div>tmin: {step.tmin}</div>
        //     <div>tmax: {step.tmax}</div>
        //     <div>tavg: {step.tavg}</div>
        //   </div>
        //   {index < steps.length - 1 && (
        //     <div style={{ display: "flex", alignItems: "center" }}>
        //       <div style={{ width: "50px", height: "2px", backgroundColor: "black" }} />
        //       <div style={{ width: "0", height: "0", borderLeft: "10px solid black", borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
        //     </div>
        //   )}
        // </React.Fragment>
      ))} */}
        </div>
    );
};
