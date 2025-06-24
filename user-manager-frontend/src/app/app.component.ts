import { Component } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { User } from './services/user.service';
@Component({
  selector: 'app-root',
  imports: [UserFormComponent,UserTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  refreshFlag = false;
  selectedUser: User | null = null;

  refreshUsers() {
    //  I flip this boolean so child component (table) knows to refresh
    this.refreshFlag = !this.refreshFlag;
  }

  loadUserIntoForm(user: any) {
    //  This is called when I click 'Edit' in table  I’ll send this user to the form
    this.selectedUser = user;
  }
}
