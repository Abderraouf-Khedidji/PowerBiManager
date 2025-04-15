"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { Component, initialState } from "./Component";

import "./../style/visual.less";

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./VisualSettings";

export class Visual implements IVisual {
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        createRoot(options.element).render(React.createElement(Component, {}));
    }

    public update(options: VisualUpdateOptions) {
        const { width, height } = options.viewport;
        const size = Math.min(width, height);

        this.formattingSettings =
            this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                options.dataViews[0]
            );
        const circleSettings = this.formattingSettings.circleCard;

        console.log("Circle settings", circleSettings);

        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            // Actualizar las configuraciones de formato
            this.formattingSettings =
                this.formattingSettingsService.populateFormattingSettingsModel(
                    VisualFormattingSettingsModel,
                    dataView
                );

            Component.update({
                dataView: options.dataViews[0],
                settings: this.formattingSettings,
                size,
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
