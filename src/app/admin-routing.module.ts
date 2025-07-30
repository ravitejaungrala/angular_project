import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Adminnavbar } from './admin/adminnavbar/adminnavbar';
import { Adminhome } from './admin/adminhome/adminhome';
import { Students } from './admin/students/students';
import { Teachers } from './admin/teachers/teachers';
import { Courses } from './admin/courses/courses';
import { Departments } from './admin/departments/departments';
import { Marks } from './admin/marks/marks';
import { Fees } from './admin/fees/fees';
import { Hostel } from './admin/hostel/hostel';
import { Attendances } from './admin/attendances/attendances';

const routes: Routes = [
  { 
    path: '', 
    component: Adminnavbar,
    children: [
      { path: 'adminhome', component: Adminhome },
     { path: 'students', component: Students },
           { path: 'teachers', component: Teachers },
           { path: 'courses', component: Courses},
           { path: 'departments', component: Departments },
           { path: 'marks', component: Marks},
           { path: 'fees', component: Fees },
           { path: 'hostel', component: Hostel },
           {path:'attendances',component:Attendances},
        
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }