import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Directive({
    selector: "[authenticated]",
})
export class AuthenticatedDirective {
    @Input('authenticated')
    value= true;
    subscription? = new Subscription;

    constructor(
        private template: TemplateRef<HTMLElement>,
        private container: ViewContainerRef,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.subscription = this.auth.authStatus$.subscribe(status => {
            this.container.clear();
            if (status === this.value) {
                this.container.createEmbeddedView(this.template);
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }

}