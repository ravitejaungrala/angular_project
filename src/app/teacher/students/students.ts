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
  students: Student[] = [];
  selectedCourseId: number | null = null;
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

  onCourseSelect(): void {
    if (!this.selectedCourseId) return;
    
    this.students = this.dataService.getStudents()
      .filter(student => student.courses.includes(this.selectedCourseId!));
  }
}