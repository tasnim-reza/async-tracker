import { LongStackTrace } from '../shared/long-stacktrace'

export interface IDeviceInfo {
  screen: string
  browser: string
  browserVersion: string
  browserMajorVersion: number
  mobile: boolean
  os: string
  osVersion: string
  cookies: boolean
}

export interface IAsyncTraceConfig {
  userInfo?: IUserInfo
  apiKey?: string
  sourceMapLocation?: string
  enablePerformanceMonitor?: boolean
  enableApiMonitor?: boolean
  /*internal use*/
  _useLocalUrl?: boolean

  enableDevMode?: boolean

  setConfig(config: Partial<IAsyncTraceConfig>): Error | void
  hasValidConfig(): boolean
}

export interface IUserInfo {
  id?: string
  userName?: string
  email?: string
  other?: string
}
