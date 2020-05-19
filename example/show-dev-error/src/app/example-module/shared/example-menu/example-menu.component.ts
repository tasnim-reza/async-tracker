import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-menu',
  templateUrl: './example-menu.component.html',
  styleUrls: ['./example-menu.component.scss']
})
export class ExampleMenuComponent implements OnInit {
  panelOpenState = true;
  constructor() { }

  ngOnInit() {
  }

}
