import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-mark',
  standalone: false,
  templateUrl: './mark.html',
  styleUrl: './mark.css'
})
export class Mark {

student!: Student;
  coursesWithMarks: { course: Course, mark: number }[] = [];
  averageMarks: number = 0;

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
   const storedUser = localStorage.getItem('currentUser');
const user: User = storedUser ? JSON.parse(storedUser) : {};
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id)!;
      
      // Get courses with marks
      this.coursesWithMarks = this.student.courses
        .map(courseId => {
          const course = this.dataService.getCourseById(courseId);
          const mark = this.student.marks[courseId] || 0;
          return { course, mark };
        })
        .filter(item => item.course) as { course: Course, mark: number }[];
      
      // Calculate average
      const marks = this.coursesWithMarks.map(item => item.mark);
      if (marks.length > 0) {
        this.averageMarks = marks.reduce((a, b) => a + b, 0) / marks.length;
      }
    }
  }
 // src/app/student/marks/marks.component.ts
getGrade(mark: number | undefined): string {
  if (mark === undefined || mark === null) return 'N/A';
  if (mark >= 90) return 'A+';
  if (mark >= 80) return 'A';
  if (mark >= 75) return 'B+';
  if (mark >= 70) return 'B';
  if (mark >= 65) return 'C+';
  if (mark >= 60) return 'C';
  if (mark >= 55) return 'D+';
  if (mark >= 50) return 'D';
  return 'F';
}
}