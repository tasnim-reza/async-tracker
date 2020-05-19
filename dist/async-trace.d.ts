import { NgZone } from '@angular/core';
import { IAsyncTraceConfig, IDeviceInfo, IUserInfo, IClientError } from './interfaces/async-trace-sdk-types';
import { AsyncTraceUtil } from './async-trace-util';
import { LongStackTrace } from './long-stacktrace';
import { sendErrorHook } from './send-error';
import { httpRequestKey } from './http-request';
declare class AsyncTrace {
    private platformConfig;
    constructor();
    setUp(platformConfig: IAsyncTraceConfig): AsyncTrace;
    getAsyncTraceZone(): NgZone;
    getAsyncTraceFullStackZone(): NgZone;
    private isValidApiKey;
}
declare const asyncTrace: AsyncTrace;
declare const asyncTraceUtil: AsyncTraceUtil;
declare const handleSyncError: (error: any) => void;
export { asyncTrace, AsyncTraceUtil, asyncTraceUtil, IDeviceInfo, IUserInfo, LongStackTrace, IClientError, handleSyncError, httpRequestKey, sendErrorHook };
