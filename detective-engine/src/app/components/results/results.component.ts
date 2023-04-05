import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  results: any[] = [];
  count = 0;
  pageSize = 9;
  currentPage = 1;
  maxPages = 5;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getPassedResults().subscribe(
      (response: any) => {
        this.results = response.results;
        this.count = response.count;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  get pagedResults(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.results.slice(startIndex, endIndex);
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.count / this.pageSize);
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.maxPages / 2)
    );
    const endPage = Math.min(pageCount, startPage + this.maxPages - 2);
    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, i) => startPage + i);
  }

  changePage(pageNumber: number) {
    if (pageNumber < this.maxPages) {
      this.currentPage = pageNumber;
    } else {
      this.currentPage = 1;
    }
  }
}
