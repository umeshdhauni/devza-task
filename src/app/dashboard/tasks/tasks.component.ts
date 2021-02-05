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
  loading: boolean;
  constructor(
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.loading = true;
    this.common.getTasks().subscribe(res => {
      this.loading = false;
      this.totalTasks = res['tasks'];
      this.arrangeTasks(res['tasks']);
    }, (err) => {
      this.loading = false;
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
    console.log(event, event.previousContainer.data);
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      let currentContainer = event.container.element.nativeElement;
      let currentTask = event.item.data;
      let priority = getPriorityId(currentContainer.getAttribute('priority'));
      if (currentTask) {
        let data = {
          priority: priority,
          taskid: currentTask.id
        }
        this.updateTaskOrder(data);
      }
    }
  }

  updateTaskOrder(data: any) {
    let formData = convertIntoFormData(data);
    this.common.updateTask(formData).subscribe(res => {
      this.getTasks();
    }, (err) => {

    })
  }

  searchTask(searchText: string) {
    let result = this.totalTasks.filter((task) => {
      let taskMessage = task.message.toLowerCase();
      let search = searchText.toLowerCase();
      return (new RegExp(search)).test(taskMessage);
    });

    this.arrangeTasks(result);
  }

  dateFilter(event) {
    let value = formatDate(event.value);

    let result = this.totalTasks.filter(task => {
      return (!task.due_date || (value >= task.due_date));
    });
    this.arrangeTasks(result);
  }

  removeDateFilter() {
    this.selectedDate = null;
    this.arrangeTasks(this.totalTasks);
  }

}
