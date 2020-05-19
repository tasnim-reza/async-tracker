import { AsyncTraceUtil } from '../shared/async-trace-util'
import {
    IUserInfo, IAsyncTraceConfig
} from '../interfaces/async-trace-sdk-types'
import { AsyncTraceError } from './async-trace-error'

export class ProdErrorConfig implements IAsyncTraceConfig {
    public userInfo?: IUserInfo
    public apiKey?: string
    public sourceMapLocation?: string
    public enablePerformanceMonitor?: boolean
    public enableApiMonitor?: boolean
    public _useLocalUrl?= false
    private static _instance: ProdErrorConfig

    private constructor() {
        this.apiKey = AsyncTraceUtil.demoApiKey
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    public setConfig(config: IAsyncTraceConfig): Error | void {
        if (!this.isValidApiKey()) {
            return AsyncTraceError.InvalidApiKey();
        }

        if (config.userInfo) {
            this.userInfo = {
                id: config.userInfo.id,
                email: config.userInfo.email,
                userName: config.userInfo.userName,
                other: config.userInfo.other
            }
        }
        this.apiKey = config.apiKey
        this.sourceMapLocation = config.sourceMapLocation
        this.enablePerformanceMonitor = config.enablePerformanceMonitor
        this.enableApiMonitor = config.enableApiMonitor
        this._useLocalUrl = config._useLocalUrl
    }

    public hasValidConfig(): boolean {
        return this.isValidApiKey();
    }

    private isValidApiKey(): boolean {
        return !!this.apiKey;
    }
}
