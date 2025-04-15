import * as React from "react";
import { VisualFormattingSettingsModel } from "./VisualSettings";
import { AutoAuthorization } from "../components/AutoAuthorization";

export interface State {
    dataView?: powerbi.DataView;
    settings: VisualFormattingSettingsModel;
    size: number;
}

export const initialState: State = {
    dataView: null,
    settings: new VisualFormattingSettingsModel(),
    size: 200,
};
export class Component extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof Component.updateCallback === "function") {
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
        const { size } = this.state;
        const style: React.CSSProperties = {
            width: size,
            height: size,
        };
        return (
            <div className="component" style={style}>
                <AutoAuthorization
                    dataView={this.state.dataView}
                    settings={this.state.settings}
                />
            </div>
        );
    }
}
