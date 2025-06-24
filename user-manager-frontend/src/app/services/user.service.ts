import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;       // optional because new users won't have it yet
  name: string;
  email: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root' // makes this service available app-wide automatically
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // backend API base URL

  constructor(private http: HttpClient) {}

  // Fetch all users from the backend
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Add a new user to the backend
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user (by ID)
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Delete a user from backend by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
