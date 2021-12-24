import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPipe} from "./pipes/user.pipe";
import {CountryPipe} from "./pipes/country.pipe";
import {StatusPipe} from "./pipes/status.pipe";
import {HoverDirective} from "./directives/hover.directive";


@NgModule({
  declarations: [
    UserPipe,
    CountryPipe,
    StatusPipe,

    HoverDirective,
  ],
  exports: [
    UserPipe,
    CountryPipe,
    StatusPipe,

    HoverDirective,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
