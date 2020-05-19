export class AsyncTraceUtil {
    public static NEWLINE = '\n';
    public static ERROR_TAG = 'STACKTRACE TRACKING';
    public static readonly creationTrace = '__creationTrace__';
    public static SEP_TAG = '__SEP_TAG__';
    public static getFrames(error: Error): string[] {
        return error.stack ? error.stack.split(AsyncTraceUtil.NEWLINE) : [];
    }
    public static sepTemplate: string = AsyncTraceUtil.SEP_TAG + '@[native]';
    public static demoApiKey = 'async-trace-demo';
}