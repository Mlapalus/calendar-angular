import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => 
    import('./auth/auth.module').then(module => module.AuthModule)
  },
  { path: '', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
