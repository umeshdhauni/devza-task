import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public searchData = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient,
  ) { }

  getTasks() {
    return this.http.get(`${environment.API_URL}/tasks/list`);
  }

  getUsers() {
    return this.http.get(`${environment.API_URL}/tasks/listusers`);
  }

  createTask(data: any) {
    return this.http.post(`${environment.API_URL}/tasks/create`, data);
  }

  updateTask(data: any) {
    return this.http.post(`${environment.API_URL}/tasks/update`, data);
  }

  deleteTask(data: any) {
    return this.http.post(`${environment.API_URL}/tasks/delete`, data);
  }


}
