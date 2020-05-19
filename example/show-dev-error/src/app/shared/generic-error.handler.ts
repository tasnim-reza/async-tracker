import { ErrorHandler } from '@angular/core';

export class GenericErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log('%c AsyncTrace', 'background: #222; color: #bada55; font-size: 40px;');
        console.error(error.asyncTrace);
        console.log('%c Traditional stacktrace', 'background: #222; color: #bada55; font-size: 40px;');
        console.error(error.error);
    }
}