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
  loading: boolean;
  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.common.getUsers().subscribe(res => {
      this.loading = false;
      this.allUsers = res['users'];
      this.totalUsers = res['users'];
    }, (err) => {
      this.loading = false;
    })
  }


  searchUser(searchText: string) {
    // console.log(searchText)
    let result = this.totalUsers.filter((user) => {
      let userName = user.name.toLowerCase();
      let search = searchText.toLowerCase();
      return (new RegExp(search)).test(userName)
    });
    this.allUsers = result;
  }

}
