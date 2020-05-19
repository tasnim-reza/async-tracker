import { httpRequest } from './http-request'
import { AsyncTraceUtil } from '../shared/async-trace-util'
import { DeviceDetector } from '../shared/device-detector'
import { ZoneDelegate, Zone, Task } from '../interfaces/angular-zone-types'
import { LongStackTrace } from '../shared/long-stacktrace'
import { ProdErrorConfig } from './prod-error-config'
import { ClientError } from '../shared/client-error'
let postHooks: Array<Function> = []

export function sendErrorHook(hook: Function) {
  postHooks.push(hook)
}

export class SendError {
  public post(
    clientError: ClientError
  ) {
    this.sendToServer(clientError)
  }

  public handleSyncError = (error: any) => {
    const isHandled = error.stack
      ? error.stack.includes('__handled_async_error__')
      : false
    if (!isHandled) {
      const currentTask: Task = (window as any)['Zone'].currentTask
      const clientError: ClientError = {
        frames: [new LongStackTrace(currentTask)],
        currentFrame: error.stack ? error.stack.split('\n') : [],
        error: '',
        deviceInfo: new DeviceDetector().getDeviceInfo(),
        userInfo: ProdErrorConfig.instance.userInfo,
        apiKey: ProdErrorConfig.instance.apiKey,
        url: window.location.href
      }
      clientError.error = error.message
      // if (clientError.currentFrame) {
      //   clientError.error = clientError.currentFrame.length
      //     ? clientError.currentFrame[0]
      //     : error.message
      // }

      if (ProdErrorConfig.instance._useLocalUrl) {
        console.log('handleSyncError sync error', clientError)
      }
      this.sendToServer(clientError)
    }
  }

  private sendToServer(clientError: ClientError) {
    const postUrl = ProdErrorConfig.instance._useLocalUrl
      ? 'http://localhost:3000/clientError'
      : 'https://api.asynctrace.com/clientError'
    // console.log('final', JSON.parse(JSON.stringify(clientError)));
    httpRequest('post', postUrl, {}, clientError).then(
      res => {
        // console.log(success);
        if (postHooks) {
          postHooks.forEach(hook => hook(false, res))
        }
      },
      error => console.warn(error)
    )
  }
}
