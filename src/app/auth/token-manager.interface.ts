import { Observable } from "rxjs";

export interface  TokenManagerInterface {
    storeToken(token: string): Observable<string>;
    loadToken(): Observable<string | null>;
    removeItem(): Observable<boolean>;
}
