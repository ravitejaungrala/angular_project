import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacherdashboard } from './teacherdashboard/teacherdashboard';
import { Courses } from './courses/courses';
import { Students } from './students/students';
import { Marks } from './marks/marks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Dataservices } from '../service/dataservices';
import { Teachernavbar } from './teachernavbar/teachernavbar';
import { TeacherRoutingModule } from '../teacher-routing.module';
import { Attendances } from './attendances/attendances';




@NgModule({
  declarations: [
    Teacherdashboard,
    Courses,
    Students,
    Marks,
    Teachernavbar,
    Attendances
  ],
 imports: [
     CommonModule,
      FormsModule,
     ReactiveFormsModule,
     TeacherRoutingModule
   ],
   providers: [Dataservices]
 })
export class TeacherModule { }
