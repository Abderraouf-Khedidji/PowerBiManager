import * as React from "react";
import { Heatmap } from "../components/Heatmap";

export interface State {
    background?: string;
    borderWidth?: number;
    width: number;
    height: number;
    table: any;
}

export const initialState: State = {
    width: 1280,
    height: 360,
    table: { columns: [], rows: [] },
};

export class Component extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
        // Asignar el callback aquí
        Component.updateCallback = (newState: State): void => {
            this.setState(newState);
        };
    }
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof Component.updateCallback === "function") {
            Component.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillUnmount() {
        Component.updateCallback = null;
    }
    render() {
        const { table } = this.state;

        const columns = table.columns;
        const rows = table.rows;

        let data = [];
        for (var i = 0; i < rows.length; i++) {
            const row = rows[i];
            let obj = {};
            for (var j = 0; j < columns.length; j++) {
                let role = "";
                if (columns[j].displayName == "x") {
                    role = "x";
                } else if (columns[j].displayName == "y") {
                    role = "y";
                } else if (columns[j].expr?.arg?.ref == "id") {
                    role = "plano";
                } else {
                    role = columns[j].expr?.arg?.ref;
                }

                obj[role] = rows[i][j];
            }
            data.push(obj);
        }

        return <Heatmap data={data} />;
    }
}
