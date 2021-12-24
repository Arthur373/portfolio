import {Injectable} from '@angular/core';
import {User} from "../models/User.model";
import {map, shareReplay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UsersService {

  private users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>("/assets/Users.json").pipe(
      map(responseData => responseData["data"]),
      shareReplay({bufferSize:1,refCount:true}),
    )
  }

  findUsers(): Observable<User[]> {
    return this.users$;

  }

  findUserNameById(id: number): Observable<string> {
    return this.users$.pipe(map(users => <string>users.find(user => user.UserID === id)?.name[3]))
  }
}
