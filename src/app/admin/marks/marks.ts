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
  marksForm: FormGroup;
  editMode: {[key: string]: boolean} = {};
  private storageEventListener: (event: StorageEvent) => void;
   constructor(
    private dataService: Dataservices,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.marksForm = this.fb.group({});
    this.storageEventListener = (event: StorageEvent) => this.handleStorageEvent(event);
  }

 ngOnInit(): void {
    this.loadAllData();
    window.addEventListener('storage', this.storageEventListener);
    
    // Add periodic check as fallback (every 2 seconds)
    setInterval(() => {
      this.checkForUpdates();
    }, 2000);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener);
  }
  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'studentsData') {
      this.processUpdate();
    }
  }

  private checkForUpdates(): void {
    const currentData = JSON.stringify(this.students);
    const freshData = localStorage.getItem('studentsData');
    
    if (freshData && currentData !== freshData) {
      console.log('Periodic check detected update');
      this.processUpdate();
    }
  }

  private processUpdate(): void {
    const freshStudents = this.dataService.getStudents();
    
    if (JSON.stringify(freshStudents) !== JSON.stringify(this.students)) {
      console.log('Updating admin view with new data');
      this.students = [...freshStudents];
      this.initializeForm();
      
      // Triple-layer change detection
      this.cdr.markForCheck();
      setTimeout(() => {
        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      }, 0);
    }
  }

  loadAllData(): void {
    this.courses = this.dataService.getCourses();
    this.students = this.dataService.getStudents();
    this.initializeForm();
  }

  initializeForm(): void {
    const formGroup: any = {};
    this.students.forEach(student => {
      if (student.marks) {
        Object.keys(student.marks).forEach(courseIdStr => {
          const courseId = Number(courseIdStr);
          const key = `student_${student.id}_course_${courseId}`;
          formGroup[key] = [
            student.marks[courseId], 
            [Validators.required, Validators.min(0), Validators.max(100)]
          ];
          this.editMode[key] = false;
        });
      }
    });
    this.marksForm = this.fb.group(formGroup);
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
  }

  getFormKey(studentId: number, courseId: number): string {
    return `student_${studentId}_course_${courseId}`;
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
    this.loadAllData();
  }
}