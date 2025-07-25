import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AuthGuard, RoleGuardService } from './service/auth-guard';



const routes: Routes = [
   { path: '', component: Login },
    { path: 'login', component: Login },
  { 
    path: 'admin', 
    canActivate: [AuthGuard, RoleGuardService],
    data: { role: 'admin' },
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
  },
  { 
    path: 'teacher', 
    canActivate: [AuthGuard, RoleGuardService],
    data: { role: 'teacher' },
    loadChildren: () => import('./teacher/teacher-module').then(m => m.TeacherModule)
  },
  { 
    path: 'student', 
    canActivate: [AuthGuard, RoleGuardService],
    data: { role: 'student' },
    loadChildren: () => import('./student/student-module').then(m => m.StudentModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
