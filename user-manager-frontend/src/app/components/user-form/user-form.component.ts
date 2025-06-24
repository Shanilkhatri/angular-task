import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {
  @Input() userToEdit: User | null = null;
  @Output() userUpdated = new EventEmitter<void>();

  user: User = {
    name: '',
    email: '',
    status: true
  };

  isEditing = false;
  message = '';

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userToEdit'] && this.userToEdit) {
      // I load the user into form when edit is triggered
      this.user = { ...this.userToEdit };
      this.isEditing = true;
      this.message = '';
    }
  }

  submitForm(form: any) {
    // if (!form.valid) {
    //   this.message = 'Please fix validation errors.';
    //   return; // Prevent submission if form is invalid
    // }
    if (!this.user.name || !this.user.email) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (this.isEditing && this.user.id) {
      // I update the user if editing
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.message = 'User updated successfully!';
        this.resetForm(form);
        this.userUpdated.emit();
      });
    } else {
      // I add a new user
      this.userService.addUser(this.user).subscribe(() => {
        this.message = 'User added successfully!';
        this.resetForm(form);
        this.userUpdated.emit();
      });
    }
  }

  resetForm(form:any) {
    this.user = { name: '', email: '', status: true };
    this.isEditing = false;
    if (form) {
      form.resetForm(); 
    }
  }
}
