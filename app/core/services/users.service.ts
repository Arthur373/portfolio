import {Injectable} from '@angular/core';
import {User} from "../models/User.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CountryModel} from "../models/Country.model";

@Injectable()
export class UsersService {

  users!: User[];

  constructor(private http: HttpClient) {
  }

  findUsers(): Observable<User[]> {
    if (this.users) {
      return of(this.users);
    } else {
      return this.http.get<User[]>("/assets/Users.json").pipe(
        map(responseData => {
          this.users = responseData["data"];
          return this.users;
        }),
      )
    }
  }

  findUserNameById(id: number): Observable<string> {
    return this.findUsers().pipe(
      map(users => {
        return <string>users.find(user => user.UserID === id)?.name[3]
      })
    )
  }
}
