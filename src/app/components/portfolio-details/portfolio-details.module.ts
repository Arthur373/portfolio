import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {PortfolioDetailsComponent} from "./portfolio-details.component";


const routes: Routes = [
  {path: '', component: PortfolioDetailsComponent},
];

@NgModule({
  declarations: [
    PortfolioDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PortfolioDetailsModule {
}
