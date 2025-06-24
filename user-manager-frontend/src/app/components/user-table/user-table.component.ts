import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnChanges {
  
  @Input() refresh = false; // tells me when to re-fetch user list
  @Output() editUser = new EventEmitter<User>(); // helps sends user to form
  
  // used to store the timeout to cancel it too
  private searchDebounceTimeout: ReturnType<typeof setTimeout> | null = null;
  
  users: User[] = [];
  filteredUsers: User[] = [];
  
  searchTerm = '';
  
  constructor(private userService: UserService) {}
  
  // this is called when the refresh input changes, there is also one more callback which ngOnInit 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh']) {
      this.loadUsers();
    }
  }
  
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.applySearch();
    });
  }

  // I have also added debouncing to reduce unecessary computation
  applySearch() {
    if (this.searchDebounceTimeout !== null) {
    clearTimeout(this.searchDebounceTimeout);
  }

  this.searchDebounceTimeout = setTimeout(() => {
    const term = this.searchTerm.toLowerCase();
    console.log(term);
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }, 300);
  }

  onEdit(user: User) {
    this.editUser.emit(user); 
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // refresh after deleting
      });
    }
  }
}
