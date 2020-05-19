import { NgZone } from '@angular/core';
export declare class AsyncTraceZone extends NgZone {
    constructor(enableLongStackTrace?: boolean);
}
export declare class AsyncTraceFullStackZone extends AsyncTraceZone {
    constructor();
}
