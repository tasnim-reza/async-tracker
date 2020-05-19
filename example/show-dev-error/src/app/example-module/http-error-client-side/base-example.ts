import { Renderer2 } from "@angular/core";
import { highlightBlock } from "highlight.js";

export class BaseExample {
    public codeSample: string;
    public createError: Function;
    public isLoading = false;
    constructor(public renderer: Renderer2) {
    }

    ngAfterViewInit() {
        const el = this.renderer.selectRootElement('#sampleCode', true);
        if (el) {
            highlightBlock(el);
        }
    }

    public showLiveError() {
        this.isLoading = true;
        this.createError();
    }
}