import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-marks',
  standalone: false,
  templateUrl: './marks.html',
  styleUrl: './marks.css'
})
export class Marks{
  courses: Course[] = [];
  students: Student[] = [];
  filteredStudents: Student[] = [];
  departments: string[] = [];
  years = [1, 2, 3, 4];
  marksForm: FormGroup;
  editMode: {[key: string]: boolean} = {};
  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;

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
    this.filteredStudents = [...this.students];
    this.departments = [...new Set(this.students.map(s => s.department))];
    this.initializeForm();
  }

  initializeForm(): void {
    const formGroup: any = {};
    this.students.forEach(student => {
      if (student.courses) {
        student.courses.forEach(courseId => {
          const key = this.getFormKey(student.id, courseId);
          formGroup[key] = [
            student.marks?.[courseId] ?? 0, 
            [Validators.required, Validators.min(0), Validators.max(100)]
          ];
          this.editMode[key] = false;
        });
      }
    });
    this.marksForm = this.fb.group(formGroup);
  }

  getFormKey(studentId: number, courseId: number): string {
    return `student_${studentId}_course_${courseId}`;
  }

  getCourseName(courseId: number): string {
    const course = this.dataService.getCourseById(courseId);
    return course ? course.name : 'Unknown Course';
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

  toggleEdit(studentId: number, courseId: number): void {
    const key = this.getFormKey(studentId, courseId);
    this.editMode[key] = !this.editMode[key];
  }

  saveMark(studentId: number, courseId: number): void {
    const key = this.getFormKey(studentId, courseId);
    const mark = this.marksForm.get(key)?.value;
    
    if (mark === null || mark === undefined) return;

    this.dataService.updateStudentMarks(studentId, courseId, mark);
    this.editMode[key] = false;
    this.loadAllData();
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

    alert('All marks updated successfully!');
    this.loadAllData();
  }

  selectStudentAndCourse(studentId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStudentId = studentId;
    this.selectedCourseId = selectElement.value ? parseInt(selectElement.value) : null;
  }

  filterByDepartment(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const dept = selectElement.value;
    if (!dept) {
      this.filteredStudents = [...this.students];
    } else {
      this.filteredStudents = this.students.filter(s => s.department === dept);
    }
  }

  filterByYear(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const year = selectElement.value;
    if (!year) {
      this.filteredStudents = [...this.students];
    } else {
      this.filteredStudents = this.students.filter(s => s.year === parseInt(year));
    }
  }

  filterByCourse(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = selectElement.value;
    if (!courseId) {
      this.filteredStudents = [...this.students];
    } else {
      const id = parseInt(courseId);
      this.filteredStudents = this.students.filter(s => s.courses.includes(id));
    }
  }
}