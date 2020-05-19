import { IAsyncTraceConfig } from "../interfaces/async-trace-sdk-types";
export declare class DevErrorConfig implements IAsyncTraceConfig {
    enableDevMode: boolean;
    private static _instance;
    private constructor();
    static readonly instance: DevErrorConfig;
    setConfig(config: IAsyncTraceConfig): void;
    hasValidConfig(): boolean;
}
