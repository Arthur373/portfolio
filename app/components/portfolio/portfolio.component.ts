import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PortfolioService} from "../../core/services/portfolio.service";
import {WorkflowStatesService} from "../../core/services/workflowStates.service";
import {Search} from "../../core/models/search.model";
import {Portfolio} from "../../core/models/portfolio.model";
import {FormControl} from "@angular/forms";
import {Status} from "../../core/models/status.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges,OnDestroy {

  @Input() searchData!: Search;
  responses: Portfolio[] = [];
  filteredTableData: Portfolio[] = [];
  statuses: Status[] = [];
  selectedStatusId: number = 0;
  statusControl: FormControl = new FormControl(0);

  /** sort */
  sortingOption: { fieldName: string, sortType: number } = {fieldName: "", sortType: -1}

  /** pagination */
  filteredDataLength: number = 0;
  currentPage: number = 0;
  recordsPerPage: number = 4;

  color: string = "rgb(180, 179, 179)";

  filterObservable:Subscription;

  constructor(private portfolioService: PortfolioService,
              private workflowStatesService: WorkflowStatesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchData == null || this.searchData) {
      this.initFilteredTableData();
    }
  }

  ngOnInit(): void {
    this.initTableData()
    this.initStatuses();
    this.statusControl.valueChanges.subscribe((newStatus: string) => this.filterByStatus(+newStatus))
  }

  private initTableData() {
    this.portfolioService.getResponses(1, this.recordsPerPage)
      .subscribe(data => {
        this.responses = data.filteredData;
        this.filteredTableData = this.responses;
        this.filteredDataLength = data.filteredDataLength;
      });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.initFilteredTableData();
  }

  /** filter status filter */
  filterByStatus(newStatus: number): void {
    this.selectedStatusId = newStatus;
    this.initFilteredTableData();
  }

  /** sort table */
  sortTable(fieldName: string, event: MouseEvent): void {
    this.sortingOption.fieldName = fieldName;
    this.getSortType(fieldName, this.sortingOption.fieldName);
    this.initFilteredTableData();
  }

  getSortType(column: string, fieldName: string): void {
    if (fieldName === column && this.sortingOption.sortType === -1) {
      this.sortingOption.sortType = 1;
    } else {
      this.sortingOption.sortType = -1;
    }
  }

  /** show status data */
  initStatuses(): void {
    this.workflowStatesService.findAllWorkflowStates().subscribe(data => this.statuses = Array.from(new Set(data)));
  }


  private initFilteredTableData() {
    this.filterObservable = this.portfolioService.getResponsesByFilter(this.currentPage, this.recordsPerPage, this.searchData, this.selectedStatusId, this.sortingOption)
      .subscribe(data => {
        this.filteredTableData = data.filteredData;
        this.filteredDataLength = data.filteredDataLength;
      });
  }

  ngOnDestroy(): void {
    console.log(this.filterObservable);
    this.filterObservable.unsubscribe()
  }
}





