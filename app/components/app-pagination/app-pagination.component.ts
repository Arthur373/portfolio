import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.css']
})
export class AppPaginationComponent implements OnChanges {

  @Input() recordsPerPage: number = 0;
  @Input() totalRecords: number = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  pages: number [] = [];
  activePage!: number;

  constructor() {
  }

  ngOnChanges(): void {
    let pageCount = this.getPageCount();
    this.pages = AppPaginationComponent.getArrayOfPage(pageCount);
    this.activePage = 1;
  }

  private  getPageCount(): number {
    let totalPage = 0;
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private static getArrayOfPage(pageCount: number): number [] {
    const pageArray:number[] = [];
    if (pageCount > 0) {
      for(let i = 1 ; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
  }

}
