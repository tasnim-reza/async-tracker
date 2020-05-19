import { Component, ElementRef } from '@angular/core';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';
import { BaseExample } from './base-example';

@Component({
  selector: 'app-http-error-client-side-complex',
  templateUrl: './http-error-client-side-complex.component.html',
  styleUrls: ['./http-error-client-side-complex.component.scss']
})
export class HttpErrorClientSideComplexComponent extends BaseExample {
  public codeSample = `
//This is a base or parent class
export class BaseExample implements OnInit {
18:     public showLiveError() {
19:         this.isLoading = true;
20:         this.createError();
21:     }
}

//This is child/derived class
export class HttpErrorClientSideComplexComponent extends BaseExample {
  48:     const callPersonService = () => {
  49:       this.personService.getName();
  50:     };
  51:     this.createError = () => {
  52:       setTimeout(callPersonService, 0);
  53:     };
  
  
}

//This is service class
10:     public getName(): Subscription {
11:         const processResponse = (response: any) => {
12:             this.person.fullName = response.data.name;
13:         }
14:         return this.httpClient
15:             .get('http://httpbin.org/ip')
16:             .subscribe(processResponse)
17:     }

//...
}
  `;
  constructor(private personService: PersonService, public element: ElementRef, public httpClient: HttpClient) {
    super(element, httpClient);

    const callPersonService = () => {
      this.personService.getName();
    };
    this.createError = () => {
      setTimeout(callPersonService, 0);
    };
  }
}