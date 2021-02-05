import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { SnackbarService } from 'src/app/utils/snackbar/snackbar.service';

export interface MatData {
  task: any
}

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatData,
    private common: CommonService,
    private msg: SnackbarService,
  ) { }

  ngOnInit() {
  }

  delete() {
    let formData: FormData = new FormData();
    formData.append('taskid', this.data['task']['id']);
    this.common.deleteTask(formData).subscribe(res => {
      if (res['status'] != "error") {
        this.dialogRef.close(true);
        this.msg.openSnackBar('Task is deleted successfully');
      }
      else {
        this.msg.openSnackBar(res['error']);
      }

    }, (err) => {

    })
  }

  close() {
    this.dialogRef.close();
  }

}
