import { ArrivalsComponent } from './arrivals/arrivals.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'board/:board/airport/:airport', component: ArrivalsComponent },
  { path: '**', redirectTo: 'board/arrivals/airport/LHR' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
