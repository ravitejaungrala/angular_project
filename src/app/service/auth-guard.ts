import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Dataservices } from './dataservices';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: Dataservices) {}

  canActivate(): boolean {
    const adminUserJson = localStorage.getItem('adminUser');
    const teacherUserJson = localStorage.getItem('teacherUser');
    const studentUserJson = localStorage.getItem('studentUser');

    let user: any = null;

    if (adminUserJson) {
      user = JSON.parse(adminUserJson);
    } else if (teacherUserJson) {
      user = JSON.parse(teacherUserJson);
      if (!this.dataService.getTeacherById(user.id)) {
        localStorage.removeItem('teacherUser');
        this.router.navigate(['/']);
        return false;
      }
    } else if (studentUserJson) {
      user = JSON.parse(studentUserJson);
      if (!this.dataService.getStudentById(user.id)) {
        localStorage.removeItem('studentUser');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    let userJson = '';

    switch (expectedRole) {
      case 'admin':
        userJson = localStorage.getItem('adminUser') || '';
        break;
      case 'teacher':
        userJson = localStorage.getItem('teacherUser') || '';
        break;
      case 'student':
        userJson = localStorage.getItem('studentUser') || '';
        break;
      default:
        this.router.navigate(['/']);
        return false;
    }

    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || user.role !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}