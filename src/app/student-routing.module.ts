import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Studentdashboard } from './student/studentdashboard/studentdashboard';
import { Studentnavbar } from './student/studentnavbar/studentnavbar';
import { Courses } from './student/courses/courses';
import { Mark } from './student/mark/mark';
import { Fees } from './student/fees/fees';
import { Hostel } from './student/hostel/hostel';
import { Attendances } from './student/attendances/attendances';

const routes: Routes = [
  { 
    path: '', 
    component: Studentnavbar,
    children: [
        { path: 'studenthome', component: Studentdashboard},
            { path: 'courses', component: Courses },
            { path: 'marks', component: Mark},
            { path: 'fees', component: Fees },
            { path: 'hostel', component: Hostel },
            {path:'attendances',component:Attendances},
            
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }