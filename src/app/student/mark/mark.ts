import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { Subscription } from 'rxjs';

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

  constructor(private dataService: Dataservices) {
    this.loadStudentData();
  }

    ngOnInit(): void {
    this.loadStudentData();
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageEvent.bind(this));
  }

  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'studentsData' || event.key === 'studentsData_refresh') {
      console.log('Student detected marks update');
      this.loadStudentData();
    }
  }
 
  private loadStudentData(): void {
    const storedUser = localStorage.getItem('studentUser');
    const user: User = storedUser ? JSON.parse(storedUser) : {};
    
    if (user.role === 'student' && user.id) {
      // Get fresh data from localStorage
      const storedStudents = localStorage.getItem('studentsData');
      const students = storedStudents ? JSON.parse(storedStudents) : [];
      this.student = students.find((s: Student) => s.id === user.id);
      
      if (this.student) {
        this.updateMarksData();
      }
    }
  }

  private updateMarksData(): void {
    if (!this.student) return;
    
    this.coursesWithMarks = this.student.courses
      .map(courseId => {
        const course = this.dataService.getCourseById(courseId);
        const mark = this.student.marks?.[courseId] || 0;
        return { course, mark };
      })
      .filter(item => item.course) as { course: Course, mark: number }[];
    
    const marks = this.coursesWithMarks.map(item => item.mark);
    if (marks.length > 0) {
      this.averageMarks = marks.reduce((a, b) => a + b, 0) / marks.length;
    }
  }

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
