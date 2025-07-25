import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacherdashboard } from './teacherdashboard/teacherdashboard';
import { Courses } from './courses/courses';
import { Students } from './students/students';
import { Marks } from './marks/marks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Dataservices } from '../service/dataservices';



@NgModule({
  declarations: [
    Teacherdashboard,
    Courses,
    Students,
    Marks
  ],
  imports: [
    CommonModule,
   FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: Teacherdashboard },
      { path: 'courses', component: Courses },
      { path: 'students', component: Students },
      { path: 'marks', component: Marks }
    ])
  ],
  providers: [Dataservices]
})
export class TeacherModule { }
