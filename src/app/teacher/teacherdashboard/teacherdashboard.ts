import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-teacherdashboard',
  standalone: false,
  templateUrl: './teacherdashboard.html',
  styleUrl: './teacherdashboard.css'
})
export class Teacherdashboard {

 teacher!: Teacher;
  stats = {
    courses: 0,
    students: 0
  };

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
   const storedUser = localStorage.getItem('currentUser');
const user = storedUser ? JSON.parse(storedUser) : {};

    if (user.role === 'teacher' && user.id) {
      this.teacher = this.dataService.getTeacherById(user.id)!;
      
      // Calculate stats
      this.stats.courses = this.teacher.courses.length;
      
      // Count students in all assigned courses
      const allStudents = this.dataService.getStudents();
      this.stats.students = allStudents.filter(student => 
        student.courses.some(courseId => 
          this.teacher.courses.includes(courseId)
        )
      ).length;
    }
  }
}
