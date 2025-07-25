import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Adminhome } from './adminhome/adminhome';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';
import { Courses } from './courses/courses';
import { Departments } from './departments/departments';
import { Marks } from './marks/marks';
import { Fees } from './fees/fees';
import { Hostel } from './hostel/hostel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dataservices } from '../service/dataservices';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Adminhome,
    Students,
    Teachers,
    Courses,
    Departments,
    Marks,
    Fees,
    Hostel
  ],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'adminhome', pathMatch: 'full' },
      { path: 'adminhome', component: Adminhome },
      { path: 'students', component: Students },
      { path: 'teachers', component: Teachers },
      { path: 'courses', component: Courses},
      { path: 'departments', component: Departments },
      { path: 'marks', component: Marks},
      { path: 'fees', component: Fees },
      { path: 'hostel', component: Hostel }
    ])
  ],
  providers: [Dataservices]
})
export class AdminModule { }
