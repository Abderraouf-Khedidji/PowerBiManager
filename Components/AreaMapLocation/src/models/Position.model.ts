export interface Position {
    start: number;
    start_ms: number;
    id1: string;
    id2: string;
    tagid: string;
    x: number;
    y: number;
    z: number;
    xf: number;
    yf: number;
    zf: number;
    quality: string;
    superFrameNumber: number;
    deployment_id: number;
    map_id: number;
    client_id: number;
    listener: string;
    configuration: {
        label: string;
        nodeType: string;
        ble: boolean;
        leds: boolean;
        uwbFirmwareUpdate: boolean;
        tag: {
            stationaryDetection: boolean;
            responsive: boolean;
            locationEngine: boolean;
            nomUpdateRate: number;
            statUpdateRate: number;
        };
    };
}
