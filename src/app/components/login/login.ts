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

  // Store in localStorage based on role
  switch(user.role) {
    case 'admin':
      localStorage.setItem('adminUser', JSON.stringify(user));
      this.router.navigate(['/admin/adminhome']);
      break;
    case 'teacher':
      localStorage.setItem('teacherUser', JSON.stringify(user));
      this.router.navigate(['/teacher/teacherhome']);
      break;
    case 'student':
      localStorage.setItem('studentUser', JSON.stringify(user));
      this.router.navigate(['/student/studenthome']);
      break;
  }

  // Optional: Also store under common key if needed
  // localStorage.setItem('currentUser', JSON.stringify(user));
  console.log('Stored in localStorage:', localStorage.getItem('currentUser')); // Debug log
} else {
  this.errorMessage = 'Invalid username or password';
  console.log('Login failed'); // Debug log
}

}
}