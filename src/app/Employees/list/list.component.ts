import { Component, Injectable, OnInit, ViewChild, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/Components/Dialog/delete-confirmation/delete-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material';

export interface todo {
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}
const ELEMENT_DATA: todo[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

@Injectable()
export class ListComponent {
  constructor(private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  title = 'angular-todo';
  displayedColumns: string[] = [
    "employee_name", "employee_age", "employee_salary", "action"
  ]
  dataSource = new MatTableDataSource<todo>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  loadSpinner = false

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit() {
    this.list()
  }

  list() {
    this.http
      .get('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe((data: any) => {
        this.length = data.length
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  }
  delete(element) {
    let deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: { element }
    })
    deleteDialog.componentInstance.onDialogAction.subscribe(({ data, type }) => {
      if (type === 'delete') {
        this.dialog.closeAll()
        this.loadSpinner = true
        this.http
          .delete(`http://dummy.restapiexample.com/api/v1/delete/${data.id}`)
          .subscribe(
            (data: any) => {
              this.list()
              this.loadSpinner = false
              this._snackBar.open('Employee deleted!', '', {
                duration: 3000
              })
            }, (error: any) => {
              this.loadSpinner = false
              this._snackBar.open('Error occured!', '', {
                duration: 3000
              })
              this.delete(element)
            }
          )
      }
      if (type === 'close') {
        this.dialog.closeAll()
      }
    });
  }
}
