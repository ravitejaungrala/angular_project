import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
LoginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: Dataservices
  ) {
    this.LoginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  checkLogin() {
    if (this.LoginForm.invalid) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    const { username, password } = this.LoginForm.value;
    const user = this.dataService.validateUser(username, password);

    if (user) {
      console.log('Login successful', user); // Debug log
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Stored in localStorage:', localStorage.getItem('currentUser')); // Debug log
      
      switch(user.role) {
        case 'admin':
          this.router.navigate(['/admin/adminhome']);
          break;
        case 'teacher':
          this.router.navigate(['/teacher']);
          break;
        case 'student':
          this.router.navigate(['/student']);
          break;
      }
    } else {
      this.errorMessage = 'Invalid username or password';
      console.log('Login failed'); // Debug log
    }
  }
}