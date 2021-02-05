import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/utils/services/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menu = new EventEmitter();
  @Output() searchData = new EventEmitter();
  @Input() title;
  constructor(
    private router: Router,
    private common: CommonService
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.menu.emit();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth'])
  }

  onSearch(event) {
    this.searchData.emit(event.target.value);
  }

}
