import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css', '../../shared/styles/loading-spinner.css', '../../shared/styles/table.css']
})
export class RecordsListComponent implements OnInit {

  displayedColumns: string[] = ["title","created"];
  data: Form[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  constructor(private service: FormsService) { }

  ngOnInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.loadData();
  }

  loadData(): void{
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.service.paginateRecords(
          this.sort.active, this.sort.direction, this.paginator.pageIndex);
      }),
      map((http_response: any) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = http_response.total_count;
        return http_response.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);
  }

}
