import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, ) { }
  onDialogAction = new EventEmitter();
  dialogData: {}
  ngOnInit() {
    this.dialogData = this.data.element
  }
  delete() {
    this.onDialogAction.emit({ type: 'delete', data: this.data.element });
  }
  close() {
    this.onDialogAction.emit({ type: 'close', data: this.data.element });
  }

}
