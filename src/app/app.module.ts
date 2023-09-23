import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppCalendarModule } from './calendar/calendar/calendar.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, TOKEN_MANAGER } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { SessionStorageTokenManagerService } from './auth/token-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCalendarModule,
    SharedModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.url_log,
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.DEBUG
    })
  ],
  providers: [AuthService, 
    {provide : TOKEN_MANAGER, useClass: SessionStorageTokenManagerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
