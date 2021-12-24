import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {SearchComponent} from "./components/search/search.component";
import {AppPaginationComponent} from "./components/app-pagination/app-pagination.component";
import {RootComponent} from "./root/root.component";

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {InterventionDetailsComponent} from "./components/intervention-details/intervention-details.component";
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    SearchComponent,
    AppPaginationComponent,
    RootComponent,
    InterventionDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
