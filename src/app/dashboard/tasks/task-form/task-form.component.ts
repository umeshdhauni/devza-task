import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { convertIntoFormData, formatDate, priorityList, validationError } from 'src/app/utils/shared/common';
import { SnackbarService } from 'src/app/utils/snackbar/snackbar.service';

export interface MatData {
  task: any
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  form: any;
  priorityList: any[] = priorityList;
  allUsers: any[];
  minDate: Date = new Date();
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
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
      message: ['', [Validators.required]],
      due_date: [''],
      priority: [''],
      assigned_to: ['']
    })
  }

  getUserList() {
    this.common.getUsers().subscribe(res => {
      this.allUsers = res['users'];
    }, (err) => {

    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.form.valid) {
      validationError(this.form);
    }
    else {
      this.loading = true;
      let data = { ...this.form.value };
      if (data.due_date) {
        data.due_date = formatDate(data.due_date);
      }
      let formData = convertIntoFormData(data);
      if (this.data['task']) {
        formData.append('taskid', this.data['task']['id']);
        this.updateTask(formData);
      }
      else {
        this.createTask(formData);
      }
    }
  }

  updateTask(formData: any) {
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

  createTask(formData: any) {
    this.common.createTask(formData).subscribe(res => {
      this.loading = false;
      if (res['status'] != "error") {
        this.dialogRef.close(true);
        this.msg.openSnackBar('Task is created successfully');
      }
      else {
        this.msg.openSnackBar(res['error']);
      }
    }, (err) => {
      this.loading = false;
      this.msg.openSnackBar(err);
    })
  }





  fillForm(data: any) {
    this.form.controls.message.setValue(data.message);
    this.form.controls.assigned_to.setValue(data.assigned_to);
    this.form.controls.priority.setValue(data.priority);
    this.form.controls.due_date.setValue(data.due_date ? new Date(data.due_date) : null);
  }

}
