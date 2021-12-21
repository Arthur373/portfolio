import {Injectable} from "@angular/core";
import {Portfolio} from "../../models/portfolio.model";
import {CountryModel} from "../../models/Country.model";
import {User} from "../../models/User.model";
import {Status} from "../../models/status.model";

@Injectable()
export class PortfolioSortService {

  public sortData(portfolios: Portfolio[],countries:CountryModel[],users:User[],statuses:Status[], sortBy: string, sortType: number): void {
    switch (sortBy) {
      case "InterventionCode":
      case  "ShortName":
      case  "Title":
        portfolios.sort((a, b) => (a[sortBy]?.localeCompare(b[sortBy])) * sortType);
        break;
      case  "InterventionCountryID":
        portfolios.sort((a, b) =>  (this.findCountryNameById(countries,a[sortBy]))?.localeCompare(
          (this.findCountryNameById(countries,b[sortBy])))* sortType);
        break;
      case  "workflowStateId":
        portfolios.sort((a, b) => (this.findWorkflowStatesName(statuses,a[sortBy])?.localeCompare(
          this.findWorkflowStatesName(statuses,b[sortBy]))) * sortType);
        break;
      case  "UpdatedUserID":
        portfolios.sort((a, b) => (this.findUserNameById(users,a[sortBy])?.localeCompare(
          this.findUserNameById(users,b[sortBy]))) * sortType);
        break;
      case  "DateUpdated":
        portfolios.sort((a, b) => (a[sortBy] - b[sortBy]) * sortType);
        break;
    }
  }


  private findCountryNameById(countries:CountryModel[],id: number): string {
    return <string>countries.find(country => country.CountryId === id)?.name[3];
  }

  private findWorkflowStatesName(statuses:Status[],id: number): string {
    return <string>statuses.find(user => user.WFSTATEID === id)?.name[3];
  }

  private findUserNameById(users:User[],id: number): string {
    return <string>users.find(user => user.UserID === id)?.name[3];
  }
}
