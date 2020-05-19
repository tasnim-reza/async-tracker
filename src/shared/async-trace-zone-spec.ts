import { AsyncTraceUtil } from './async-trace-util'
import { LongStackTrace } from './long-stacktrace'
import { SendError } from '../prod-error/send-error'
import {
  ZoneSpec,
  ZoneDelegate,
  Zone,
  Task,
  HasTaskState
} from '../interfaces/angular-zone-types'
import { ProdErrorConfig } from '../prod-error/prod-error-config'
import { DevErrorConfig } from '../dev-error/dev-error-config'
import { ClientSideProcessor } from '../dev-error/client-side-processor'
import { ClientError } from './client-error'

export class AsyncTraceZoneSpec implements ZoneSpec {
  name = 'asynctrace-stack-trace'
  longStackTraceLimit = 10

  constructor() { }

  onScheduleTask(
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    task: Task
  ): any {
    const currentTask: Task = (window as any)['Zone'].currentTask
    let trace =
      (currentTask &&
        currentTask.data &&
        (currentTask.data as any)[AsyncTraceUtil.creationTrace]) ||
      []
    // if (AsyncTraceConfig.instance._useLocalUrl) {
    //   console.log('onScheduleTask', trace)
    // }
    // console.log('target', currentTask && currentTask)

    //
    if (task.source.includes('XMLHttpRequest')) {
      Error['stackTraceLimit'] = 30
      // console.log('updated trace limit', new LongStackTrace(currentTask));
    }

    trace = [new LongStackTrace(currentTask)].concat(trace)

    if (task.source.includes('XMLHttpRequest')) {
      Error['stackTraceLimit'] = 15
      // console.log('updated trace limit', new LongStackTrace(currentTask));
    }

    if (trace.length > this.longStackTraceLimit) {
      trace.length = this.longStackTraceLimit
    }
    if (!task.data) task.data = {}
    if (task.type === 'eventTask') {
      // Fix issue https://github.com/angular/zone.js/issues/1195,
      // For event task of browser, by default, all task will share a
      // singleton instance of data object, we should create a new one here

      // The cast to `any` is required to workaround a closure bug which wrongly applies
      // URL sanitization rules to .data access.
      ; (task.data as any) = { ...(task.data as any) }
    }
    ; (task.data as any)[AsyncTraceUtil.creationTrace] = trace

    return parentZoneDelegate.scheduleTask(targetZone, task)
  }

  onHandleError(
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    error: any
  ): boolean {

    // error.stack += '\n    __handled_async_error__';
    // console.log(error)
    const clientError = new ClientError(parentZoneDelegate, currentZone, targetZone, error);
    let asyncTrace;
    if (DevErrorConfig.instance.enableDevMode) {
      asyncTrace = new ClientSideProcessor().process(clientError);
    } else {
      new SendError().post(clientError);
    }

    return parentZoneDelegate.handleError(targetZone, { error, asyncTrace })
  }

  properties?: { [key: string]: any }
  onFork?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    zoneSpec: ZoneSpec
  ) => Zone
  onIntercept?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    delegate: Function,
    source: string
  ) => Function
  onInvoke?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    delegate: Function,
    applyThis: any,
    applyArgs?: any[],
    source?: string
  ) => any
  onInvokeTask?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    task: Task,
    applyThis: any,
    applyArgs?: any[]
  ) => any
  onCancelTask?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    task: Task
  ) => any
  onHasTask?: (
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    hasTaskState: HasTaskState
  ) => void
}
