import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonService } from 'src/app/utils/services/common/common.service';
import { getPriorityId, priorityList, convertIntoFormData, formatDate } from 'src/app/utils/shared/common';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { TaskFormComponent } from './task-form/task-form.component';

export interface TaskList {
  normal?: any[],
  mid?: any[],
  high?: any[],
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  allTasks: TaskList = {};
  totalTasks: any[];
  selectedDate: Date;
  constructor(
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.common.getTasks().subscribe(res => {
      this.totalTasks = res['tasks'];
      this.arrangeTasks(res['tasks']);
    }, (err) => {

    })
  }

  createTask() {
    this.taskModal();
  }

  updateTask(task) {
    this.taskModal(task);
  }

  taskModal(task?: any) {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      maxHeight: '100vh',
      width: '450px',
      data: {
        task: task
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTasks();
      }
    });
  }

  deleteTask(task?: any) {
    let dialogRef = this.dialog.open(DeleteTaskComponent, {
      maxHeight: '100vh',
      width: '450px',
      data: {
        task: task
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTasks();
      }
    });
  }

  assignUser(task: any) {
    let dialogRef = this.dialog.open(AssignTaskComponent, {
      maxHeight: '100vh',
      width: '450px',
      data: {
        task: task
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTasks();
      }
    });
  }

  arrangeTasks(tasks) {
    let priorities = priorityList;
    for (let priority of priorities) {
      let key = priority.name.toLowerCase();
      this.allTasks[key] = tasks.filter(task => {
        return task.priority == priority.value;
      })
    }

  }

  dropTask(event) {
    
  }

  updateTaskOrder(data: any) {
    let formData = convertIntoFormData(data);
    this.common.updateTask(formData).subscribe(res => {
      this.getTasks();
    }, (err) => {

    })
  }

  searchTask(searchText: string) {
    
  }

  dateFilter(event) {
    let value = formatDate(event.value);
    console.log(value)
  }

}
