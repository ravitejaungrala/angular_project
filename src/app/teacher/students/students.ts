import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

teacher!: Teacher;

 studentsByCourse: {[courseId: number]: Student[]} = {};
  courses: Course[] = [];

  constructor(private dataService: Dataservices) {}

 
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'teacher' && user.id) {
      this.teacher = this.dataService.getTeacherById(user.id)!;
      this.courses = this.dataService.getTeacherCourses(user.id);
      
      // Load students for all courses
      this.courses.forEach(course => {
        this.studentsByCourse[course.id] = this.dataService.getStudentsByCourse(course.id);
      });
    }
  }
}