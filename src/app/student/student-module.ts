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



@NgModule({
  declarations: [
    Studentdashboard,
    Courses,
    Mark,
    Fees,
    Hostel
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Studentdashboard},
      { path: 'courses', component: Courses },
      { path: 'marks', component: Mark},
      { path: 'fees', component: Fees },
      { path: 'hostel', component: Hostel }
    ])
  ],
  providers: [Dataservices]
})
export class StudentModule { }
