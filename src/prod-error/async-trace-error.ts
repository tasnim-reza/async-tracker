export class AsyncTraceError {
    public static InvalidApiKey(): Error {
        throw new Error('Invalid api key, Please contact apikey@asynctrace.com');
    }

    public static MalformedSdkSetup(): Error {
        throw new Error('Malformed SDK Setup, it can happened if you call createZone before setUp.');
    }

    public static InvalidSdkConfig(): Error {
        throw new Error('Invalid SDK configuration.');
    }
}