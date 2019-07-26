import { HttpClient } from '@angular/common/http';
import * as core from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
@core.Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements core.OnInit {
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
  constructor(private http: HttpClient, private router: Router, @core.Inject(ActivatedRoute) private _activatedroute: ActivatedRoute, private _snackBar: MatSnackBar, private _employee: EmployeeService) { }

  ngOnInit() {
    this.view()
  }

  view() {
    this._employee.get({ id: this._activatedroute.snapshot.params.id })
      .subscribe((data: any) => {
        this.nameFormControl.setValue(data.employee_name);
        this.ageFormControl.setValue(data.employee_age);
        this.salaryFormControl.setValue(data.employee_salary);
      })
  }
  save() {
    this.loadSpinner = true
    let payload = { id: this._activatedroute.snapshot.params.id, name: this.nameFormControl.value, salary: this.salaryFormControl.value, age: this.ageFormControl.value }
    this._employee.save(payload)
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
