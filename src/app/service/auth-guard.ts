import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Dataservices } from './dataservices'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataService: Dataservices
  ) {}

  canActivate(): boolean {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      this.router.navigate(['/']);
      return false;
    }

    const user = JSON.parse(userJson);
    // Verify the user still exists in our data service
    if (user.role === 'teacher' && user.id) {
      if (!this.dataService.getTeacherById(user.id)) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
        return false;
      }
    } else if (user.role === 'student' && user.id) {
      if (!this.dataService.getStudentById(user.id)) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}
// Role-based auth guard
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const userJson = localStorage.getItem('currentUser');
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  if (!user || !user.role) {
    this.router.navigate(['/']);
    return false;
  }

  if (route.data['role'] && route.data['role'] !== user.role) {
    this.router.navigate(['/']);
    return false;
  }

  return true;
}
}