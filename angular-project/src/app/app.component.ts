import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-project';
  hidden = false;
  list: any[] = [];
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  addTask(item: String) {
    this.list.push({
      id: this.list.length,
      name: item,
    });
  }
  remove(id: Number) {
    this.list = this.list.filter((item) => item.id !== id);
  }

  data = 10;

  updateChild() {
    this.data = Math.floor(Math.random() * 100);
  }

  userDetails = [
    { name: 'Shubham', email: 'test1@gmail.com' },
    { name: 'Ayush', email: 'test2@gmail.com' },
    { name: 'Jakzz', email: 'test3@gmail.com' },
    { name: 'Ankit', email: 'test4@gmail.com' },
  ];

  shubham = 'hi shubham';
  updateData(item: string) {
    this.shubham = item;
  }

  title1 = 'Two way binding';
  name: any;

  getval(item: any) {
    console.log(item);
  }

  basicpipes = 'Angular Basic Pipes';
  today = new Date();

  user = {
    name: 'shubham',
    age: 25,
  };

  text: any = '';
  userlogin(item: any) {
    console.log(item);

    this.text = item;
  }

  text1: any = '';
  form = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required ,Validators.minLength(5)]),
  });
  loginuser() {
    this.text1 = this.form.value;
  }
  get userx() {
    return this.form.get('user');
  }
  get passwordx(){
    return this.form.get('password');
  }
}
