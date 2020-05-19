import { AsyncTraceZone } from './shared/async-trace-zone'
import { overrideToJsonImplementation } from './shared/error-extension'
import {
  IAsyncTraceConfig,
} from './interfaces/async-trace-sdk-types'
import { DevErrorConfig } from './dev-error/dev-error-config'
import { ProdErrorConfig } from './prod-error/prod-error-config'
import { AsyncTraceError } from './prod-error/async-trace-error'

class AsyncTrace {
  private sdkConfig?: IAsyncTraceConfig;
  private error?: Error | void;

  constructor() {
    overrideToJsonImplementation();
  }

  public setUp(config: Partial<IAsyncTraceConfig>) {
    if (config.enableDevMode) {
      this.sdkConfig = DevErrorConfig.instance;
    } else {
      this.sdkConfig = ProdErrorConfig.instance;
    }
    this.error = this.sdkConfig.setConfig(config);
    return this;
  }

  public createZone() {
    if (this.error) {
      return [this.error];
    }

    if (!this.sdkConfig) {
      return [AsyncTraceError.MalformedSdkSetup()];
    }

    if (this.sdkConfig.hasValidConfig()) {
      return [null, new AsyncTraceZone()];
    } else {
      return [AsyncTraceError.InvalidSdkConfig()];
    }
  }
}

export const asyncTrace = new AsyncTrace();

