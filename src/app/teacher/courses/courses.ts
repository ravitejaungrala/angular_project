import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  teacher!: Teacher;
  courses: Course[] = [];
  students: Student[] = [];
  showStudents = false;
  selectedCourseId: number | null = null;
 
 courseStudents: {[courseId: number]: Student[]} = {};
 
  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {}


   ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('teacherUser') || '{}');
    if (user.role === 'teacher' && user.id) {
      this.teacher = this.dataService.getTeacherById(user.id)!;
      this.courses = this.dataService.getTeacherCourses(user.id);
      
      // Load students for all courses upfront
      this.courses.forEach(course => {
        this.courseStudents[course.id] = this.dataService.getStudentsByCourse(course.id);
      });
    }
  }

 
}