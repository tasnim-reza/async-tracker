import { LongStackTrace } from '../long-stacktrace';
export interface IDeviceInfo {
    screen: string;
    browser: string;
    browserVersion: string;
    browserMajorVersion: number;
    mobile: boolean;
    os: string;
    osVersion: string;
    cookies: boolean;
}
export interface IClientError {
    frames: LongStackTrace[];
    currentFrame: Array<string> | undefined;
    deviceInfo: IDeviceInfo;
    userInfo: IUserInfo | undefined;
    apiKey: string;
    url: string;
    error: string;
}
export interface IAsyncTraceConfig {
    userInfo?: IUserInfo;
    apiKey: string;
    sourceMapLocation?: string;
    enablePerformanceMonitor?: boolean;
    enableApiMonitor?: boolean;
    _useLocalUrl?: boolean;
    enableDevMode?: boolean;
}
export interface IUserInfo {
    id?: string;
    userName?: string;
    email?: string;
    other?: string;
}
