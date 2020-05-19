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
      [];

    //Set a higher limit so we can track all the stack
    if (task.source.includes('XMLHttpRequest')) {
      Error['stackTraceLimit'] = 30
    }

    trace = [new LongStackTrace(currentTask)].concat(trace)

    //restore to normal limit
    if (task.source.includes('XMLHttpRequest')) {
      Error['stackTraceLimit'] = 15
    }

    if (trace.length > this.longStackTraceLimit) {
      trace.length = this.longStackTraceLimit
    }
    if (!task.data) task.data = {}

    if (task.type === 'eventTask') {
      // Fix issue https://github.com/angular/zone.js/issues/1195
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

    const clientError = new ClientError(parentZoneDelegate, currentZone, targetZone, error);
    let completeStacktrace = new ClientSideProcessor().process(clientError);

    if (!DevErrorConfig.instance.enableDevMode) {
      new SendError().post(clientError);
    }

    // pass original error and completeStacktrace to next error handler
    return parentZoneDelegate.handleError(targetZone, { error, asyncTrace: completeStacktrace })
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
