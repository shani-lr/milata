import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WordOfWeekComponent } from './word-of-week/word-of-week.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdminGuard } from './administration/admin-guard.service';

const appRoutes: Routes = [
  { path: '', component: WordOfWeekComponent },
  { path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
