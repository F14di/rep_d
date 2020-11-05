import { FormsService } from './../forms.service';
import { Form } from './../../models/form';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css', '../../shared/styles/loading-spinner.css', '../../shared/styles/table.css']
})
export class FormsListComponent implements OnInit {
  displayedColumns: string[] = ["title","created","actions"];
  data: Form[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: FormsService, private router: Router, private route: ActivatedRoute) {}

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
        return this.service.paginateForms(
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

  onUploadFile(): void{
    this.router.navigate(['../new-form'], {relativeTo: this.route});
  }
  onSendForm(row){
    console.log(row)
  }
}
