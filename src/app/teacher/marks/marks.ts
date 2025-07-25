import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-marks',
  standalone: false,
  templateUrl: './marks.html',
  styleUrl: './marks.css'
})
export class Marks {
 teacher!: Teacher;
  courses: Course[] = [];
  selectedCourseId: number | null = null;
  students: Student[] = [];
  marksForm: FormGroup;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.marksForm = this.fb.group({});
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'teacher' && user.id) {
      this.teacher = this.dataService.getTeacherById(user.id)!;
      this.courses = this.teacher.courses
        .map(courseId => this.dataService.getCourseById(courseId))
        .filter(course => course) as Course[];
    }
  }

  // src/app/teacher/marks/marks.component.ts
onCourseSelect(): void {
  if (!this.selectedCourseId) return;

  // Clear previous form
  this.marksForm = this.fb.group({});
  
  // Get students enrolled in this course
  this.students = this.dataService.getStudents()
    .filter(student => student.courses.includes(this.selectedCourseId!));
  
  // Create form controls for each student
  const formGroup: any = {};
  this.students.forEach(student => {
    const currentMark = student.marks[this.selectedCourseId!];
    formGroup[`student_${student.id}`] = [
      currentMark !== undefined ? currentMark : '',
      [Validators.required, Validators.min(0), Validators.max(100)]
    ];
  });
  
  this.marksForm = this.fb.group(formGroup);
}

  onSubmit(): void {
    if (this.marksForm.invalid || !this.selectedCourseId) return;

    // Update marks for each student
    Object.keys(this.marksForm.controls).forEach(key => {
      const studentId = parseInt(key.split('_')[1]);
      const mark = this.marksForm.get(key)?.value;
      
      const student = this.dataService.getStudentById(studentId);
      if (student && mark !== null && mark !== undefined) {
        student.marks[this.selectedCourseId!] = mark;
        this.dataService.updateStudent(student);
      }
    });

    alert('Marks updated successfully!');
  }
}