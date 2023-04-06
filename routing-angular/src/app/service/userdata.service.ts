import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  constructor() {}
  users() {
    return [
      { name: 'Shubham', age: 25, email: 'test1@mail.com' },
      { name: 'Rohan', age: 26, email: 'test2@mail.com' },
      { name: 'Sohan', age: 21, email: 'test3@mail.com' },
      { name: 'Dohan', age: 22, email: 'test4@mail.com' },
    ];
  }
}
