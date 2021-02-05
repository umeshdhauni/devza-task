import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './dashboard/not-found/not-found.component';
import { PanelComponent } from './dashboard/shared-components/panel/panel.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';
import { UsersComponent } from './dashboard/users/users.component';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        component: TasksComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
