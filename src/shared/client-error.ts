import { ZoneDelegate, Zone } from "../interfaces/angular-zone-types";
import { DeviceDetector } from "./device-detector";
import { ProdErrorConfig } from "../prod-error/prod-error-config";
import { LongStackTrace } from "./long-stacktrace";
import { IDeviceInfo, IUserInfo } from "../interfaces/async-trace-sdk-types";
import { AsyncTraceUtil } from "./async-trace-util";

export class ClientError {
    currentFrame: Array<string>;
    frames: LongStackTrace[];
    deviceInfo: IDeviceInfo;
    userInfo?: IUserInfo;
    apiKey?: string;
    url: string;
    error: string;

    constructor(
        parentZoneDelegate: ZoneDelegate,
        currentZone: Zone,
        targetZone: Zone,
        error: any) {
        const parentTask = (window as any)['Zone'].currentTask || error.task;

        this.frames = parentTask.data && parentTask.data[AsyncTraceUtil.creationTrace];
        this.deviceInfo = new DeviceDetector().getDeviceInfo();
        this.userInfo = ProdErrorConfig.instance.userInfo;
        this.apiKey = ProdErrorConfig.instance.apiKey;
        this.url = window.location.href;


        if (error instanceof Error && parentTask) {
            this.currentFrame = error.stack ? error.stack.split('\n') : []
            this.error = error.message

            if (
                error.message.includes('Uncaught (in promise)') &&
                error.message &&
                error.message.length
            ) {
                const token = error.message.split('\n')
                if (token && token.length) {
                    this.error = token[0]
                }
            }

            if (ProdErrorConfig.instance._useLocalUrl) {
                console.log('post: send to server: Error instance', this)
            }
        } else {
            this.currentFrame = error

            this.error = error.message

            if (ProdErrorConfig.instance._useLocalUrl) {
                console.log('post: send to server: Not Error instance', this)
            }
        }

    }
}