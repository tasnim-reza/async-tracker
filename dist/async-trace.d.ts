import { AsyncTraceZone } from './shared/async-trace-zone';
import { IAsyncTraceConfig } from './interfaces/async-trace-sdk-types';
declare class AsyncTrace {
    private sdkConfig?;
    private error?;
    constructor();
    setUp(config: Partial<IAsyncTraceConfig>): this;
    createZone(): Error[] | (AsyncTraceZone | null)[];
}
export declare const asyncTrace: AsyncTrace;
export {};
