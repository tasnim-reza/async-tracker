import { AsyncTraceUtil } from './async-trace-util'
import { Task } from '../interfaces/angular-zone-types'
import { ExtendedTask } from './extended-task'

export class LongStackTrace {
  error: Error
  timestamp: Date = new Date()
  task: ExtendedTask
  constructor(task: Task) {
    this.task = new ExtendedTask(task)
    // Some implementations of exception handling don't create a stack trace if the exception
    // isn't thrown, however it's faster not to actually throw the exception.
    const uncaughtError = this.getStacktraceWithUncaughtError()
    const caughtError = this.getStacktraceWithCaughtError()
    this.error = uncaughtError.stack
      ? uncaughtError
      : caughtError.stack
        ? caughtError
        : uncaughtError
  }

  private getStacktraceWithUncaughtError(): Error {
    return new Error(AsyncTraceUtil.ERROR_TAG)
  }

  private getStacktraceWithCaughtError(): Error {
    try {
      throw this.getStacktraceWithUncaughtError()
    } catch (err) {
      return err
    }
  }
}