import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule, MatButtonModule, MatCardModule, MatIconModule, MatGridListModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule, MatListModule } from '@angular/material'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './Employees/add/add.component';
import { EditComponent } from './Employees/edit/edit.component';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './Employees/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './Components/Dialog/delete-confirmation/delete-confirmation.component';

const appRoutes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [DeleteConfirmationComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
