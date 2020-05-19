export declare class AsyncTraceUtil {
    static NEWLINE: string;
    static ERROR_TAG: string;
    static readonly creationTrace = "__creationTrace__";
    static SEP_TAG: string;
    static getFrames(error: Error): string[];
    static sepTemplate: string;
    static demoApiKey: string;
}
