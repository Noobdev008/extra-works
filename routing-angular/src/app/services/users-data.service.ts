import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private http: HttpClient) {}
  users() {
    return this.http.get('https://api.github.com/users');
  }
  saveusers(data: any) {
    return this.http.post('https://api.github.com/users', JSON.stringify(data));
  }
}
