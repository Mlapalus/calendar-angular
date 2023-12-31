import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from "angular-calendar";
import { CalendarUtilsModule } from '../header/header.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        CalendarUtilsModule,
    ],
    declarations: [CalendarComponent],
    exports: [CalendarComponent]
})
export class AppCalendarModule {}