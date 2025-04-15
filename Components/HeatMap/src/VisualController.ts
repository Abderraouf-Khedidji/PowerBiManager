"use strict";
import powerbi from "powerbi-visuals-api";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataViewTable = powerbi.DataViewTable;

import * as React from "react";
import { createRoot } from "react-dom/client";
import { Component, initialState } from "./Component";

import "./../style/visual.less";

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./VisualSettings";

export class Visual implements IVisual {
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        const root = createRoot(options.element);
        this.formattingSettingsService = new FormattingSettingsService();
        // root.render(React.createElement(Component, {}));
    }

    public update(options: VisualUpdateOptions) {
        const { width, height } = options.viewport;
        const table = options.dataViews[0].table;
        this.formattingSettings =
            this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                options.dataViews[0]
            );

        const settings = this.formattingSettings.componentSettings;
        if (options.dataViews && options.dataViews[0]) {
            Component.update({
                width,
                height,
                table: table,
                borderWidth: settings.circleThickness.value,
                background: settings.circleColor.value.value,
            });
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
