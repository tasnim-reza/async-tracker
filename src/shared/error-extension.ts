import { ExtendedTask } from "./extended-task"

export function overrideToJsonImplementation() {
  /* 
  This is `toJson` implementation for Error object
  more details: https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
  */
  if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
      value: function () {
        var alt: any = {}

        Object.getOwnPropertyNames(this).forEach(function (key) {
          // @ts-ignore
          alt[key] = this[key]
        }, this)

        if (alt.stack === undefined && this['stack']) {
          alt.stack = this['stack']
        }

        return alt
      },
      configurable: true,
      writable: true
    })
  }

  /*
  Usually Zone Task doesn't have source, type, target and eventName
  These information is valuable for extended debug
  */
  if (!('toJSON' in ExtendedTask.prototype)) {
    Object.defineProperty(ExtendedTask.prototype, 'toJSON', {
      value: function () {
        if (this && this.task) {
          var alt = {
            type: this.task.type,
            // data: this.task.data,
            source: this.task.source,
            // @ts-ignore
            target: this.task['target'],
            // @ts-ignore
            eventName: this.task['eventName']
          }

          if (alt.target && alt.target instanceof HTMLElement) {
            alt.target = alt.target.outerHTML
          } else if (alt.target && alt.target instanceof XMLHttpRequest) {
            alt.target = 'XMLHttpRequest'
          }
          return alt
        } else {
          return null
        }
      },
      configurable: true,
      writable: true
    })
  }
}
