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
import { RouterModule, Routes } from '@angular/router';
import { Adminnavbar } from './adminnavbar/adminnavbar';
import { AdminRoutingModule } from '../admin-routing.module';
import { Attendances } from './attendances/attendances';



@NgModule({
  declarations: [
    Adminhome,
    Students,
    Teachers,
    Courses,
    Departments,
    Marks,
    Fees,
    Hostel,
    Adminnavbar,
    Attendances
  ],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [Dataservices]
})
export class AdminModule { }
