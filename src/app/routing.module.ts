import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WordOfWeekComponent } from './word-of-week/word-of-week.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdminGuard } from './administration/admin-guard.service';
import { ResultsComponent } from './results/results.component';
import { HistoryComponent } from './history/history.component';
import { FunFactsComponent } from './fun-facts/fun-facts.component';

const appRoutes: Routes = [
  { path: '', component: WordOfWeekComponent },
  { path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard] },
  { path: 'results', component: ResultsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'fun-facts', component: FunFactsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
