import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marks',
  standalone: false,
  templateUrl: './marks.html',
  styleUrl: './marks.css'
})
export class Marks {

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
    this.courses = this.dataService.getCourses();
  }

  onCourseSelect(): void {
    if (!this.selectedCourseId) return;

    this.students = this.dataService.getStudents()
      .filter(student => student.courses.includes(this.selectedCourseId!));
    
    const formGroup: any = {};
    this.students.forEach(student => {
      formGroup[`student_${student.id}`] = [student.marks[this.selectedCourseId!] || ''];
    });
    
    this.marksForm = this.fb.group(formGroup);
  }

  onSubmit(): void {
    if (this.marksForm.invalid || !this.selectedCourseId) return;

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

  getGrade(mark: number): string {
    if (!mark) return 'N/A';
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