import { Observable, of } from "rxjs";
import { TokenManagerInterface } from "./token-manager.interface";

export class LocalStorageTokenManagerService implements TokenManagerInterface{

    storeToken(token: string): Observable<string> {
        window.localStorage.setItem('authToken', token);

        return of(token);
    }

    loadToken(): Observable<string | null> {
        return of(window.localStorage.getItem('authToken'));
    }

    removeItem(): Observable<boolean> {
        window.localStorage.removeItem('authToken');

        return of(true);
    }

}
export class SessionStorageTokenManagerService implements TokenManagerInterface{

    storeToken(token: string): Observable<string> {
        window.sessionStorage.setItem('authToken', token);

        return of(token);
    }

    loadToken(): Observable<string | null> {
        return of(window.sessionStorage.getItem('authToken'));
    }

    removeItem(): Observable<boolean> {
        window.sessionStorage.removeItem('authToken');

        return of(true);
    }

}