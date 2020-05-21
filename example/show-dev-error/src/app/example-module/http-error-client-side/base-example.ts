export class BaseExample {
    public codeSample: string;
    public createError: Function;
    public isLoading = false;
    constructor() {
    }

    public showLiveError() {
        this.isLoading = true;
        this.createError();
    }
}