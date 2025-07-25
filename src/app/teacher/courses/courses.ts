import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

teacher!: Teacher;
  courses: Course[] = [];

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'teacher' && user.id) {
      this.teacher = this.dataService.getTeacherById(user.id)!;
      this.courses = this.teacher.courses
        .map(courseId => this.dataService.getCourseById(courseId))
        .filter(course => course) as Course[];
    }
  }
}