import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/utils/services/common/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers: any[];
  totalUsers: any[];
  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.common.getUsers().subscribe(res => {
      this.allUsers = res['users'];
      this.totalUsers = res['users'];
    }, (err) => {

    })
  }


  searchUser(searchText: string) {
    
  }

}
