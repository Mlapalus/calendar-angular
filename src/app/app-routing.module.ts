import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'account', loadChildren: () => 
    import('./auth/auth.module').then(module => module.AuthModule)
  },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
