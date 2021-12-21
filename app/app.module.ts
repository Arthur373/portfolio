import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {SearchComponent} from './components/search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppPaginationComponent} from "./components/app-pagination/app-pagination.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    SearchComponent,
    AppPaginationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
