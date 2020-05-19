import { IAsyncTraceConfig } from "../interfaces/async-trace-sdk-types";

export class DevErrorConfig implements IAsyncTraceConfig {
    enableDevMode: boolean = true;
    private static _instance: DevErrorConfig

    private constructor() {
        this.enableDevMode = true;
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    public setConfig(config: IAsyncTraceConfig) {
    }

    public hasValidConfig(): boolean {
        return this.enableDevMode;
    }
}