import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class CalendarHeaderComponent {
  @Input()
  view: CalendarView = CalendarView.Month;

  @Input()
  viewDate: Date = new Date();

  @Output()
  viewChange = new EventEmitter<CalendarView>();

  @Output()
  viewDateChange = new EventEmitter<Date>();

  @Input()
  locale: string = 'en';

  CalendarView = CalendarView;


}
