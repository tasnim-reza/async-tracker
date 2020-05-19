import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PersonService {
    public person: { fullName: string };
    constructor(private httpClient: HttpClient) { }

    public getName(): Subscription {
        const processResponse = (response: any) => {
            this.person.fullName = response.data.name;
        }
        return this.httpClient
            .get('http://httpbin.org/ip')
            .subscribe(processResponse)
    }
}