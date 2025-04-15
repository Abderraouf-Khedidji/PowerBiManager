import * as React from "react";
import App from "./App";
import { WorkFlowStep } from "./models/WorkFlowStep.model";

export interface State {
    textLabel: string;
    textValue: string;
    size: number;
    background?: string;
    borderWidth?: number;
    table: any[];
    headers: string[];
    steps: WorkFlowStep[];
}

export const initialState: State = {
    textLabel: "",
    textValue: "",
    size: 200,
    table: [],
    headers: [],
    steps: [],
};

export class Component extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (Component.updateCallback) {
            Component.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        Component.updateCallback = (newState: State): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        Component.updateCallback = null;
    }

    render() {
        const {
            textLabel,
            textValue,
            size,
            background,
            borderWidth,
            steps,
            table,
        } = this.state;

        return (
            <div className="main-container">
                <div className="graph-container">
                    <App dataView={{ table: { rows: table } }} />
                </div>
            </div>
        );
    }
}
