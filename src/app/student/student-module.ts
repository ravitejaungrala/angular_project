import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Studentdashboard } from './studentdashboard/studentdashboard';
import { Courses } from './courses/courses';
import { Mark } from './mark/mark';
import { Fees } from './fees/fees';
import { Hostel } from './hostel/hostel';
import { RouterModule } from '@angular/router';
import { Dataservices } from '../service/dataservices';
import { FormsModule } from '@angular/forms';
import { Studentnavbar } from './studentnavbar/studentnavbar';
import { StudentRoutingModule } from '../student-routing.module';
import { Attendances } from './attendances/attendances';




@NgModule({
  declarations: [
    Studentdashboard,
    Courses,
    Mark,
    Fees,
    Hostel,
    Studentnavbar,
    Attendances
  ],
  imports: [
    CommonModule,
    FormsModule,
   StudentRoutingModule
  ],
  providers: [Dataservices]
})
export class StudentModule { }
