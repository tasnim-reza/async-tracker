import { Task } from '../interfaces/angular-zone-types';

export class ExtendedTask {
    private task: Task;
    constructor(task: Task) {
        this.task = task;
    }
}
