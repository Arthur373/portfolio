import {Injectable} from '@angular/core';
import {Status} from "../models/status.model";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WorkflowStatesService {

  private workFlowStates$!: Observable<Status[]>;

  constructor(private http: HttpClient) {
    this.workFlowStates$ = this.http.get<Status[]>("/assets/WorkflowStates.json").pipe(
      map(responseData => responseData["data"]),
      shareReplay({bufferSize: 1, refCount: true}),
    )
  }

  findAllWorkflowStates(){
    return this.workFlowStates$;
  }

  findWorkflowStatesNameById(id: number):Observable<string>{
    return this.workFlowStates$.pipe(map(statuses => <string>statuses.find(state => state.WFSTATEID === id)?.name[3]));
  }
}
