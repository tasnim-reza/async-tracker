import { IDeviceInfo } from "../interfaces/async-trace-sdk-types";
export declare class DeviceDetector {
    private unknown;
    private nVer;
    private nAgt;
    private browser;
    private version;
    private majorVersion;
    private mobile;
    private screenSize;
    private os;
    private osVersion;
    private cookieEnabled;
    constructor();
    private setScreenSizeIfPossible;
    private setBrowserInfo;
    private setCookieInfo;
    private setOsInfo;
    /**
     * getDeviceInfo
     */
    getDeviceInfo(): IDeviceInfo;
}
