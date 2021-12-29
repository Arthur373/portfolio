import {Pipe, PipeTransform} from '@angular/core';
import {WorkflowStatesService} from "../../core/services/workflowStates.service";
import {Portfolio} from "../../core/models/portfolio.model";
import {Observable} from "rxjs";

@Pipe({
  name: 'statusName'
})
export class StatusPipe implements PipeTransform {

  constructor(private workflowStatesService: WorkflowStatesService) {
  }

  transform(portfolio: Portfolio): Observable<string> {
    return this.workflowStatesService.getWorkflowStatesNameById(portfolio?.workflowStateId);
  }
}
