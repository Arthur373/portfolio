import {Injectable} from '@angular/core';
import {User} from "../models/User.model";
import {map, shareReplay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UsersService {

  private users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.initUsers();
  }

  initUsers(){
    this.users$ = this.http.get<User[]>("/assets/Users.json").pipe(
      map(responseData => responseData["data"]),
      shareReplay({bufferSize: 1, refCount: true}),
    )
  }

  getUsers(): Observable<User[]> {
    return this.users$;

  }

  getUserNameById(id: number): Observable<string> {
    return this.users$.pipe(map(users => <string>users.find(user => user.UserID === id)?.name[3]))
  }
}
