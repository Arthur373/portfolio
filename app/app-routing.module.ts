import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {RootComponent} from "./root/root.component";
import {InterventionDetailsComponent} from "./components/intervention-details/intervention-details.component";

const routes: Routes = [
  {path: '',component: RootComponent},
  {path: 'intervention/:interventionID',component: InterventionDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
