import { NgZone } from '@angular/core'
import { AsyncTraceZoneSpec } from './async-trace-zone-spec'

export class AsyncTraceZone extends NgZone {
  constructor(enableLongStackTrace = false) {
    super({ enableLongStackTrace: enableLongStackTrace || false })
    Error['stackTraceLimit'] = 15
    ;(this as any)['_inner'] = (this as any)['_inner'].fork(
      new AsyncTraceZoneSpec()
    )
  }
}

export class AsyncTraceFullStackZone extends AsyncTraceZone {
  constructor() {
    super(true)
  }
}
