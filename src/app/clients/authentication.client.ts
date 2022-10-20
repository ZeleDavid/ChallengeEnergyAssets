import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClient {
    constructor() { }

    public login(username: string, password: string): Observable<string> {
        //this is where you would check to api if username and password are correct
        return of('Bearer AbCdEf123456');
    }
}