import * as http from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private http: http.HttpClient, private router: Router, private _snackBar: MatSnackBar, private _employee: EmployeeService) { }
  loadSpinner = false
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  ageFormControl = new FormControl('', [
    Validators.required,
  ]);
  salaryFormControl = new FormControl('', [
    Validators.required,
  ]);
  ngOnInit() {
  }

  save() {
    this.loadSpinner = true
    let payload = { name: this.nameFormControl.value, salary: this.salaryFormControl.value, age: this.ageFormControl.value }
    this._employee.save(payload).subscribe(
      (data: any) => {
        this.loadSpinner = false
        this._snackBar.open('Employee details added!', '', {
          duration: 3000
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/list');
        });
      },
      (error: any) => {
        this.loadSpinner = false
        this._snackBar.open('Error occured!', '', {
          duration: 3000
        })
      }
    )
  }
}
