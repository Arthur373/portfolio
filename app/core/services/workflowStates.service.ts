import {Injectable} from '@angular/core';
import {Status} from "../models/status.model";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WorkflowStatesService {

  workFlowStates!: Status[];

  constructor(private http: HttpClient) { }

  findAllWorkflowStates(){
    if (this.workFlowStates) {
      return of(this.workFlowStates);
    } else {
      return this.http.get<Status[]>("/assets/WorkflowStates.json").pipe(
        map(responseData => {
          this.workFlowStates =  responseData["data"];
          return this.workFlowStates;
        })
      )
    }
  }

  findWorkflowStatesNameById(id: number):Observable<string>{
    return this.findAllWorkflowStates().pipe(
      map(statuses => {
        return <string>statuses.find(state => state.WFSTATEID === id)?.name[3]
      })
    )
  }
}
