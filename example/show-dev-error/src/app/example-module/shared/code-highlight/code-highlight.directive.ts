import { Directive, ElementRef } from '@angular/core';
import { highlightBlock } from 'highlight.js';

@Directive({
  selector: '[appCodeHighlight]'
})
export class CodeHighlightDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.el) {
      highlightBlock(this.el.nativeElement);
    }
  }
}
