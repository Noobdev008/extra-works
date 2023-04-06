import { Component } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { UsersDataService } from './services/users-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'routing-angular';
  users: any;
  user: any;
  // data: any;
  constructor(private userData: UserdataService, data: UsersDataService) {
    console.log(userData.users());
    this.users = userData.users();
    
    data.users().subscribe((edata) => {
      this.user = edata;
      console.log(this.user);
    });
  }
  getUserFormData(data1: any) {
    console.log(data1, ' data');
    data.saveusers(data1).subscribe((result:any) => {
      console.log(result);
    });
  }
}
