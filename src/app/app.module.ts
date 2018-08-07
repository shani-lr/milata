import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng4-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment.prod';
import { WordOfWeekComponent } from './word-of-week/word-of-week.component';
import { DataService } from './data.service';
import { AdministrationComponent } from './administration/administration.component';
import { RoutingModule } from './models/routing.module';
import { AuthService } from './auth.service';
import { AdminGuard } from './administration/admin-guard.service';
import { ResultsComponent } from './results/results.component';
import { HistoryComponent } from './history/history.component';
import { FunFactsComponent } from './fun-facts/fun-facts.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordOfWeekComponent,
    AdministrationComponent,
    ResultsComponent,
    HistoryComponent,
    FunFactsComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    ChartsModule
  ],
  providers: [
    DataService,
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
