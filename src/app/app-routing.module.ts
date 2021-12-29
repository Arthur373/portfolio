import {NgModule} from '@angular/core';

import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {RootComponent} from "./components/root/root.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      {path: 'portfolios', component: RootComponent}
    ]
  },
  // TODO: use lazy load
  {
    path: 'portfolios/:portfolioInstanceID',
    loadChildren: () => import('./components/portfolio-details/portfolio-details.module').then(m => m.PortfolioDetailsModule)
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
