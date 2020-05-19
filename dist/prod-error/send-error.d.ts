import { ClientError } from '../shared/client-error';
export declare function sendErrorHook(hook: Function): void;
export declare class SendError {
    post(clientError: ClientError): void;
    handleSyncError: (error: any) => void;
    private sendToServer;
}
