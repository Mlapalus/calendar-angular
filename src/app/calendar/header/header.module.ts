import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "angular-calendar";
import { CalendarHeaderComponent } from "./header.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [CalendarHeaderComponent],
    exports: [CalendarHeaderComponent]
})
export class CalendarUtilsModule {}