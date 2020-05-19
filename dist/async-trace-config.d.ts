import { IAsyncTraceConfig, IUserInfo } from './interfaces/async-trace-sdk-types';
export declare class AsyncTraceConfig implements IAsyncTraceConfig {
    userInfo?: IUserInfo;
    apiKey: string;
    sourceMapLocation?: string;
    enablePerformanceMonitor?: boolean;
    enableApiMonitor?: boolean;
    _useLocalUrl?: boolean | undefined;
    private static _instance;
    private constructor();
    static readonly instance: AsyncTraceConfig;
    setConfig(config: IAsyncTraceConfig): void;
}
