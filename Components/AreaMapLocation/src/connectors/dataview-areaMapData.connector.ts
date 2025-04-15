import { AreaMapData } from "../models/AreaMapData.model";

export const dataViewToAreaMapData = (table: {
    rows: any[];
    identityFields: { ref: string }[];
}): AreaMapData[] | [] => {
    if (!table) {
        console.error(
            "Error en el conector DataViewToAreaMapData: Parametro Table es incorrecto"
        );
        return [];
    }

    const { rows, identityFields } = table;

    const fieldIndexMap = identityFields.reduce((acc, field, index) => {
        acc[field.ref] = index;
        return acc;
    }, {} as Record<string, number>);

    return rows.map((row) => ({
        color: row[fieldIndexMap["color"]],
        x: row[fieldIndexMap["x"]],
        y: row[fieldIndexMap["y"]],
        area_id: row[fieldIndexMap["id"]],
        plano: row[fieldIndexMap["map_id"]],
        origin_coordsx: row[fieldIndexMap["origin_coordsx"]],
        origin_coordsy: row[fieldIndexMap["origin_coordsy"]],
        sort_order: row[fieldIndexMap["sort_order"]],
        label: row[fieldIndexMap["type"]],
        scale: row[fieldIndexMap["escalex"]],
        total_tags: row[fieldIndexMap["total_tags"]],
        area_type: row[fieldIndexMap["area_type"]],
    }));
};
