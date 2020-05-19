import { OnInit, ElementRef } from "@angular/core";
import { highlightBlock } from "highlight.js";
import { HttpClient } from "@angular/common/http";

export class BaseExample implements OnInit {
    public codeSample;
    public createError: Function;
    public isLoading = false;
    constructor(public element: ElementRef, public httpClient?: HttpClient) {
    }

    ngOnInit() {
        const el = this.element.nativeElement.querySelector('pre code');
        el.innerHTML = this.codeSample;
        highlightBlock(el);
    }

    public showLiveError() {
        this.isLoading = true;
        this.createError();
    }
}