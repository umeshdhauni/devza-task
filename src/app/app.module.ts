import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { UsersComponent } from './dashboard/users/users.component';
import { DeleteTaskComponent } from './dashboard/tasks/delete-task/delete-task.component';
import { HeaderComponent } from './dashboard/shared-components/header/header.component';
import { PanelComponent } from './dashboard/shared-components/panel/panel.component';
import { NotFoundComponent } from './dashboard/not-found/not-found.component';
import { MaterialModule } from './utils/shared/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './utils/services/httpInterceptor/http-interceptor.service';
import { TaskFormComponent } from './dashboard/tasks/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriorityPipe } from './utils/pipes/priority/priority.pipe';
import { AssignTaskComponent } from './dashboard/tasks/assign-task/assign-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UsersComponent,
    DeleteTaskComponent,
    HeaderComponent,
    PanelComponent,
    NotFoundComponent,
    TaskFormComponent,
    PriorityPipe,
    AssignTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TaskFormComponent,
    DeleteTaskComponent,
    AssignTaskComponent
  ]
})
export class AppModule { }
