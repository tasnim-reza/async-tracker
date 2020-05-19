import { Task } from '../interfaces/angular-zone-types';
export declare class LongStackTrace {
    error: Error;
    timestamp: Date;
    task: ExtendedTask;
    constructor(task: Task);
    private getStacktraceWithUncaughtError;
    private getStacktraceWithCaughtError;
}
export declare class ExtendedTask {
    private task;
    constructor(task: Task);
}
