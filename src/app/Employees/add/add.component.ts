import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }
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
    let payload = { "name": this.nameFormControl.value, "salary": this.salaryFormControl.value, "age": this.ageFormControl.value }
    this.http
      .post(`http://dummy.restapiexample.com/api/v1/create`, payload)
      .subscribe(
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
