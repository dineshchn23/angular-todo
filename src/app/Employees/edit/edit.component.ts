import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
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
  constructor(private http: HttpClient, private router: Router, @Inject(ActivatedRoute) private _activatedroute: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.view()
  }

  view() {
    this.http
      .get(`http://dummy.restapiexample.com/api/v1/employee/${this._activatedroute.snapshot.params.id}`)
      .subscribe((data: any) => {
        this.nameFormControl.setValue(data.employee_name);
        this.ageFormControl.setValue(data.employee_age);
        this.salaryFormControl.setValue(data.employee_salary);
      })
  }
  save() {
    this.loadSpinner = true
    let payload = { "name": this.nameFormControl.value, "salary": this.salaryFormControl.value, "age": this.ageFormControl.value }
    this.http
      .put(`http://dummy.restapiexample.com/api/v1/update/${this._activatedroute.snapshot.params.id}`, payload)
      .subscribe(
        (data: any) => {
          this.loadSpinner = false
          this.view()
          this._snackBar.open('Employee details updated!', '', {
            duration: 3000
          })
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
