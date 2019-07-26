import { HttpClient } from '@angular/common/http';
import * as core from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "../employee.service";
import { DeleteConfirmationComponent } from 'src/app/Components/Dialog/delete-confirmation/delete-confirmation.component';

export interface todo {
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}
const ELEMENT_DATA: todo[] = [];

@core.Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

@core.Injectable()
export class ListComponent {
  constructor(private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar, private _employee: EmployeeService) { }

  title = 'angular-todo';
  displayedColumns: string[] = [
    "employee_name", "employee_age", "employee_salary", "action"
  ]
  dataSource = new MatTableDataSource<todo>(ELEMENT_DATA);
  @core.ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

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
    this._employee.list().subscribe((data: any) => {
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
        this._employee.delete(data).subscribe(
          (data: any) => {
            this.list()
            this.loadSpinner = false
            this._snackBar.open('Employee deleted!', '', {
              duration: 3000
            })
          },
          (error: any) => {
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
