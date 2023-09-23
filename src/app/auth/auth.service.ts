import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { environment } from '../../environments/environment';
import { LoginData, RegisterData, ResponseApiData } from "./auth.type";
import { TokenManagerInterface } from "./token-manager.interface";

export const TOKEN_MANAGER = new InjectionToken('La classe à injecter pour stocker un token');

@Injectable()
export class AuthService {
    authStatus$ = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
        @Inject(TOKEN_MANAGER) private tokenManager: TokenManagerInterface
        ) {
        this.authToken.subscribe((token)  => {
            if(token) {
            this.authStatus$.next(true);
        }
        })
    }

    register(registerData: RegisterData) {
        return this.http.post(environment.url_save_user, registerData)
    }

    exists(email: string) {
        return this.http
                .post<{exist: boolean}>(environment.url_email_exist, { email, })
                .pipe(map(apiResponse => apiResponse.exist))
    }

    login(loginData: LoginData) {
        return this.http.post<ResponseApiData>(environment.url_login, loginData)
                    .pipe(
                        map(response => response.authToken),
                        tap( (token) => {
                                    this.tokenManager.storeToken(token);
                                    this.authStatus$.next(true)
                        })
                        )
        ;
    }
    
    logout() {
        this.authStatus$.next(false);
        this.tokenManager.removeItem();
    }

    get authToken(): Observable<string | null> {
        return this.tokenManager.loadToken();
    }
}