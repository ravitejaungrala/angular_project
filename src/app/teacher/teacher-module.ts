import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacherdashboard } from './teacherdashboard/teacherdashboard';
import { Courses } from './courses/courses';
import { Students } from './students/students';
import { Marks } from './marks/marks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Dataservices } from '../service/dataservices';
import { Teachernavbar } from './teachernavbar/teachernavbar';
import { AdminRoutingModule } from '../admin-routing.module';
import { TeacherRoutingModule } from '../teacher-routing.module';



@NgModule({
  declarations: [
    Teacherdashboard,
    Courses,
    Students,
    Marks,
    Teachernavbar
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
