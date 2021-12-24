import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {RootComponent} from "./root/root.component";
import {InterventionDetailsComponent} from "./components/intervention-details/intervention-details.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: '',component: RootComponent,
    children:[
      { path: 'intervention', component: RootComponent }
    ]
  },
  { path: 'intervention/:interventionID',component: InterventionDetailsComponent },
  { path: '**',component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
