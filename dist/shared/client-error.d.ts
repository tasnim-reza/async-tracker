import { ZoneDelegate, Zone } from "../interfaces/angular-zone-types";
import { LongStackTrace } from "./long-stacktrace";
import { IDeviceInfo, IUserInfo } from "../interfaces/async-trace-sdk-types";
export declare class ClientError {
    currentFrame: Array<string>;
    frames: LongStackTrace[];
    deviceInfo: IDeviceInfo;
    userInfo?: IUserInfo;
    apiKey?: string;
    url: string;
    error: string;
    constructor(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any);
}
