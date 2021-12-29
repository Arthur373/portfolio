import {Pipe, PipeTransform} from '@angular/core';
import {UsersService} from "../../core/services/users.service";
import {Portfolio} from "../../core/models/portfolio.model";
import {Observable} from "rxjs";

@Pipe({
  name: 'userName'
})
export class UserPipe implements PipeTransform {

  constructor(private usersService: UsersService) {
  }

  transform(portfolio: Portfolio): Observable<string> {
    return this.usersService.getUserNameById(portfolio?.UpdatedUserID);
  }
}
