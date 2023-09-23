import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";


export const AuthGard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    let isLogged: boolean = false;

    auth.authStatus$.subscribe(status => isLogged = status)
    if (!isLogged) {
        router.navigateByUrl('/account/connexion')
        return false;
    }

    return true;
}
