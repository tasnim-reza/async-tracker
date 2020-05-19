import { IUserInfo, IAsyncTraceConfig } from '../interfaces/async-trace-sdk-types';
export declare class ProdErrorConfig implements IAsyncTraceConfig {
    userInfo?: IUserInfo;
    apiKey?: string;
    sourceMapLocation?: string;
    enablePerformanceMonitor?: boolean;
    enableApiMonitor?: boolean;
    _useLocalUrl?: boolean | undefined;
    private static _instance;
    private constructor();
    static readonly instance: ProdErrorConfig;
    setConfig(config: IAsyncTraceConfig): Error | void;
    hasValidConfig(): boolean;
    private isValidApiKey;
}
