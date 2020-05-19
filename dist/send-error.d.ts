import { ZoneDelegate, Zone } from './interfaces/angular-zone-types';
export declare function sendErrorHook(hook: Function): void;
export declare class SendError {
    post(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any): void;
    handleSyncError: (error: any) => void;
    private sendToServer;
}
