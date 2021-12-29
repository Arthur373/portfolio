import {Injectable} from "@angular/core";
import {Portfolio} from "../../models/portfolio.model";
import {Search} from "../../models/search.model";


@Injectable()
export class PortfolioFilterService {

  public filterData(allResponse: Portfolio[], searchData: Search, statusId: number): Portfolio[] {
    let filterData = allResponse;
    if (statusId) {
      filterData = this.filterStatusById(filterData, statusId);
    }
    if (searchData) {
      if (searchData?.countryId) {
        filterData = this.filterCountryById(filterData, searchData.countryId)
      }
      if (searchData?.keyword) {
        filterData = this.filterByKeyword(filterData, searchData)
      }
      if (searchData?.fromDate || searchData?.toDate) {
        filterData = this.filterByDate(filterData, searchData);
      }
    }
    return filterData;
  }

  private filterStatusById(filterData, statusId?: number): Portfolio[] {
    return filterData.filter(response => statusId === response.workflowStateId);
  }

  private filterCountryById(filterData: Portfolio[], countryId: number): Portfolio[] {
    return filterData.filter(response => countryId === response.InterventionCountryID);
  }

  private filterByKeyword(filterData: Portfolio[], searchData: Search): Portfolio[] {
    return filterData.filter(data => PortfolioFilterService.filterKeyword(data, searchData));
  }

  private static filterKeyword(data: Portfolio, searchData: Search): boolean {
    let isChecked: boolean = false;
    let nothingSelect: boolean = false;
    if (!(searchData.code || searchData.title || searchData.shortName || searchData.description)) {
      nothingSelect = true;
    }
    if (searchData.code || nothingSelect) {
      isChecked = data.InterventionCode?.toLocaleLowerCase().includes(searchData.keyword?.toLocaleLowerCase());
      if (isChecked) {
        return isChecked
      }
    }
    if (searchData.title || nothingSelect) {
      isChecked = data.Title?.toLocaleLowerCase().includes(searchData.keyword?.toLocaleLowerCase());
      if (isChecked) {
        return isChecked
      }
    }
    if (searchData.shortName || nothingSelect) {
      isChecked = data.ShortName?.toLocaleLowerCase().includes(searchData.keyword?.toLocaleLowerCase());
      if (isChecked) {
        return isChecked
      }
    }
    if (searchData.description || nothingSelect) {
      isChecked = data.Description?.toLocaleLowerCase().includes(searchData.keyword?.toLocaleLowerCase());
      if (isChecked) {
        return isChecked
      }
    }
    return isChecked;
  }

  /** filter date */
  private filterByDate(filterData: Portfolio[], searchData: Search): Portfolio[] {
    return filterData.filter(data => PortfolioFilterService.dateFilter(data, searchData));
  }

  private static dateFilter(data: Portfolio, searchData: Search): boolean {
    const searchStartDate = searchData.fromDate ? new Date(searchData.fromDate).getTime() : 0;
    const searchEndDate = searchData.toDate ? new Date(searchData.toDate).getTime() : new Date().getTime();
    const actualDate = new Date(data.ActualStartDate).getTime();

    return searchStartDate <= actualDate && actualDate <= searchEndDate;
  }

}
