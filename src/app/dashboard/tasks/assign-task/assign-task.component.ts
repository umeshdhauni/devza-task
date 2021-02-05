import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { convertIntoFormData, validationError } from 'src/app/utils/shared/common';
import { SnackbarService } from 'src/app/utils/snackbar/snackbar.service';

export interface MatData {
  task: any
}

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {
  form: any;
  allUsers: any[];
  loading: boolean;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignTaskComponent>,
    private common: CommonService,
    private msg: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: MatData,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getUserList();
    if (this.data['task']) {
      this.fillForm(this.data['task']);
    }
  }

  createForm() {
    this.form = this.fb.group({
      assigned_to: ['', [Validators.required]]
    })
  }

  getUserList() {
    this.common.getUsers().subscribe(res => {
      this.allUsers = res['users'];
    }, (err) => {

    })
  }

  fillForm(data: any) {
    if (data.assigned_to) {
      this.form.controls.assigned_to.setValue(data.assigned_to);
    }
  }

  assignUser(data: any) {
    if (!this.form.valid) {
      validationError(this.form);
    }
    else {
      this.loading = true;
      let formData = convertIntoFormData(data);
      formData.append('taskid', this.data['task']['id']);
      this.common.updateTask(formData).subscribe(res => {
        this.loading = false;
        if (res['status'] != "error") {
          this.dialogRef.close(true);
          this.msg.openSnackBar('Task is updated successfully');
        }
        else {
          this.msg.openSnackBar(res['error']);
        }
      }, (err) => {
        this.loading = false;
        this.msg.openSnackBar(err);
      })
    }
  }

}
