import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-example-layout',
    templateUrl: './example-layout.component.html',
    styleUrls: ['./example-layout.component.scss']
})
export class ExampleLayoutComponent implements AfterViewInit, OnDestroy {
    constructor(private activatedRoute: ActivatedRoute) { }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }
}
