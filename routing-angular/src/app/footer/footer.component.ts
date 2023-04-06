import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../service/userdata.service';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  memberData = [
    { name: 'Shubham', email: 'test1@mail.com' },
    { name: 'Rohan', email: 'test2@mail.com' },
    { name: 'Sohan', email: 'test3@mail.com' },
    { name: 'Dohan', email: 'test4@mail.com' },
  ];
  users: any;
  user: any;
  constructor(private userData: UserdataService, data: UsersDataService) {
    console.log(userData.users());
    this.users = userData.users();
    data.users().subscribe((edata) => {
      this.user = edata;
      console.log(this.user);
      
    });
  }

  ngOnInit(): void {}
}
