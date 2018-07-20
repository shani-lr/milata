import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment.prod';
import { WordOfWeekComponent } from './word-of-week/word-of-week.component';
import { DataService } from './data.service';
import { AdministrationComponent } from './administration/administration.component';
import { RoutingModule } from './routing.module';
import { AuthService } from './auth.service';
import { AdminGuard } from './administration/admin-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordOfWeekComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    DataService,
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
