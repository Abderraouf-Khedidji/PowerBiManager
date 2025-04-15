"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { Component, initialState, State } from "./Component";

import "../style/visual.less";

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./VisualSettings";

import "./../style/visual.less";

export class Visual implements IVisual {
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        const root = createRoot(options.element);
        this.formattingSettingsService = new FormattingSettingsService();
        root.render(React.createElement(Component, {}));
    }

    public update(options: VisualUpdateOptions) {
        const { width, height } = options.viewport;
        const dataView = options.dataViews[0];
        const displayNameMap: { [key: string]: string } = {
            "neuroretail work_processes.name": "Nombre del proceso",
            "neuroretail work_processes.id": "Identificador del proceso",
            "neuroretail work_flows.name": "Nombre de WorkFlow",
            "neuroretail work_flows.id": "Identificador del WorkFlow",
            "neuroretail work_processes.tmin": "Tiempo mínimo",
            "neuroretail work_processes.tmax": "Tiempo máximo",
            "neuroretail work_flow_step.name": "Nombre de paso",
        };
        const dataMaped = dataView.metadata.columns.map((column) => {
            const customDisplayName =
                displayNameMap[column.queryName] || column.displayName;
            return customDisplayName;
        });

        if (options.dataViews && options.dataViews[0]) {
            const steps = dataView.table.rows.map((row: any) => ({
                id: row[1].toString(), // Assuming 'id' is the second column
                name: row[6], // Assuming 'name' is the seventh column
                tmin: row[4], // Assuming 'tmin' is the fifth column
                tmax: row[5], // Assuming 'tmax' is the sixth column
                tavg: (row[4] + row[5]) / 2, // Calculate tavg as the average of tmin and tmax
                workflowId: row[3].toString(), // Assuming 'workflowId' is the fourth column
                areaId: row[7],
            }));

            // Check if all steps belong to the same workflow
            const workflowIds = steps.map((step) => step.workflowId);
            const uniqueWorkflowIds = new Set(workflowIds);

            if (uniqueWorkflowIds.size > 1) {
                this.clear();
                return;
            }

            const newState: State = {
                ...initialState, // Reset the state to initialState
                textLabel: "pepe",
                textValue: "pepe",
                table: dataView.table.rows,
                headers: dataMaped,
                size: 200,
                borderWidth: 500,
                background: "white",
                steps,
            };

            Component.update(newState);
        } else {
            this.clear();
        }
    }

    private clear() {
        Component.update(initialState);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(
            this.formattingSettings
        );
    }
}
