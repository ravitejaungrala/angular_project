import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

 student!: Student;
  courses: Course[] = [];

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('studentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id)!;
      this.courses = this.student.courses
        .map(courseId => this.dataService.getCourseById(courseId))
        .filter(course => course) as Course[];
    }
  }
}