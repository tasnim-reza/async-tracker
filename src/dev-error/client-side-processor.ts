import { ZoneDelegate, Zone } from "../interfaces/angular-zone-types";
import { ClientError } from "../shared/client-error";
import { LongStackTrace } from "../shared/long-stacktrace";
import { AsyncTraceUtil } from "../shared/async-trace-util";

const IGNORE_FRAMES = [
    "Error: STACKTRACE TRACKING",
    "LongStackTrace",
    "AsyncTraceZoneSpec",
    "vendor",
    "polyfills",
];

export class ClientSideProcessor {
    public process(clientError: ClientError) {
        const flattenFrames = this.flattenFrames(clientError.frames, clientError.currentFrame);
        // console.error(flattenFrames.join('\n'));
        return flattenFrames.join('\n');
    }

    private flattenFrames(stacks: LongStackTrace[], currentStacks: Array<string>) {
        const interestedFrames: Array<string> = [];
        for (let i = 0; i < currentStacks.length; i++) {
            const frame = currentStacks[i];
            if (!IGNORE_FRAMES.some(f => frame.includes(f))) {
                interestedFrames.push(frame);
            }
        }

        for (let i = 0; i < stacks.length; i++) {
            const traceFrames: LongStackTrace = stacks[i];
            let frames = AsyncTraceUtil.getFrames(traceFrames.error);

            for (let i = 0; i < frames.length; i++) {
                const frame = frames[i];
                if (!IGNORE_FRAMES.some(f => frame.includes(f))) {
                    interestedFrames.push(frame);
                }
            }
        }

        return interestedFrames;
    }
}