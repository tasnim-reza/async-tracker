import { ClientError } from "../shared/client-error";
export declare class ClientSideProcessor {
    process(clientError: ClientError): string;
    private flattenFrames;
}
