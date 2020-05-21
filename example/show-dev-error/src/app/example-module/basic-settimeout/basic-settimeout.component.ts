import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-settimeout',
  templateUrl: './basic-settimeout.component.html',
  styleUrls: ['./basic-settimeout.component.scss']
})
export class BasicSetTimeoutComponent {
  public codeSample =
    `
export class BasicSetTimeoutComponent {
//...


33:   public generateError() {
34:     setTimeout(this.getName, 0);
35:   }
36: 
37:   private getName() {
38:     throw new Error('Name Not found');
39:   }
40: 
41:   public showLiveError() {
42:     this.isLoading = true;
43:     this.generateError();
44:   }

//...
}
`;

  public generateError() {
    setTimeout(this.getName, 0);
  }

  private getName() {
    throw new Error('Name Not found');
  }

  public showLiveError() {
    this.isLoading = true;
    this.generateError();
  }

  public isLoading = false;

  constructor() {
  }
}