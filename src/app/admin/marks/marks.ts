import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-marks',
  standalone: false,
  templateUrl: './marks.html',
  styleUrl: './marks.css'
})
export class Marks {
  courses: Course[] = [];
  students: Student[] = [];
  showStudentMarks = false;
  selectedCourseId: number | null = null;

  
  marksForm: FormGroup;

//   constructor(
//     private dataService: Dataservices,
//     private fb: FormBuilder
//   ) {
//     this.courseForm = this.fb.group({
//       courseId: [null, Validators.required]
//     });
//     this.marksForm = this.fb.group({});
//   }

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     this.courses = this.dataService.getCourses();
//   }

//   onCourseSelect(): void {
//     this.showStudentMarks = false;
//     this.marksForm = this.fb.group({});
//     this.selectedCourseId = this.courseForm.value.courseId;
//   }

//   loadStudents(): void {
//     if (this.courseForm.invalid || !this.selectedCourseId) return;

//     // Get students enrolled in the selected course
//     this.students = this.dataService.getStudentsByCourse(this.selectedCourseId);
    
//     // Initialize the marks form
//     const formGroup: any = {};
//     this.students.forEach(student => {
//       const currentMark = student.marks?.[this.selectedCourseId!] || '';
//       formGroup[`student_${student.id}`] = [
//         currentMark,
//         [Validators.required, Validators.min(0), Validators.max(100)]
//       ];
//     });
    
//     this.marksForm = this.fb.group(formGroup);
//     this.showStudentMarks = true;
//   }

//   onSubmitMarks(): void {
//     if (this.marksForm.invalid || !this.selectedCourseId) return;

//     Object.keys(this.marksForm.controls).forEach(key => {
//       const studentId = parseInt(key.split('_')[1]);
//       const mark = this.marksForm.get(key)?.value;
      
//       if (mark !== null && mark !== undefined) {
//         this.dataService.updateStudentMarks(studentId, this.selectedCourseId!, mark);
//       }
//     });

//     alert('Marks updated successfully!');
//     this.loadStudents(); // Refresh the data
//   }

//   getGrade(mark: number): string {
//     if (mark === null || mark === undefined) return 'N/A';
//     if (mark >= 90) return 'A+';
//     if (mark >= 80) return 'A';
//     if (mark >= 75) return 'B+';
//     if (mark >= 70) return 'B';
//     if (mark >= 65) return 'C+';
//     if (mark >= 60) return 'C';
//     if (mark >= 55) return 'D+';
//     if (mark >= 50) return 'D';
//     return 'F';
//   }
// }
constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.marksForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.courses = this.dataService.getCourses();
    this.students = this.dataService.getStudents();
    
    // Initialize form with all students and their marks
    const formGroup: any = {};
    this.students.forEach(student => {
      if (student.marks) {
        Object.keys(student.marks).forEach(courseIdStr => {
          const courseId = Number(courseIdStr); // Convert string key to number
          const key = `student_${student.id}_course_${courseId}`;
          formGroup[key] = [
            student.marks[courseId], 
            [Validators.required, Validators.min(0), Validators.max(100)]
          ];
        });
      }
    });
    
    this.marksForm = this.fb.group(formGroup);
  }

  onSubmitMarks(): void {
    if (this.marksForm.invalid) return;

    Object.keys(this.marksForm.controls).forEach(key => {
      const [_, studentId, __, courseId] = key.split('_');
      const mark = this.marksForm.get(key)?.value;
      
      if (mark !== null && mark !== undefined) {
        this.dataService.updateStudentMarks(parseInt(studentId), parseInt(courseId), mark);
      }
    });

    alert('Marks updated successfully!');
    this.loadAllData(); // Refresh the data
  }

  getGrade(mark: number): string {
    if (mark === null || mark === undefined) return 'N/A';
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

  getStudentCourses(student: Student): Course[] {
    return student.courses
      .map(courseId => this.dataService.getCourseById(courseId))
      .filter(course => course !== undefined) as Course[];
  }
}