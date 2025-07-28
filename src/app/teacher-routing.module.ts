import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Teacherdashboard } from './teacher/teacherdashboard/teacherdashboard';
import { Courses } from './teacher/courses/courses';
import { Students } from './teacher/students/students';
import { Marks } from './teacher/marks/marks';
import { Teachernavbar } from './teacher/teachernavbar/teachernavbar';
import { Attendances } from './teacher/attendances/attendances';
const routes: Routes = [
  { 
    path: '', 
    component: Teachernavbar,
    children: [
        { path: 'teacherhome', component: Teacherdashboard },
            { path: 'courses', component: Courses },
            { path: 'students', component: Students },
            { path: 'marks', component: Marks },
            {path:'attendances',component:Attendances}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }