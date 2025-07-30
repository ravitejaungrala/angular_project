import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendances',
  standalone: false,
  templateUrl: './attendances.html',
  styleUrl: './attendances.css'
})
export class Attendances {
 teacherCourses: Course[] = [];
  students: StudentWithAttendance[] = [];
  attendanceForm: FormGroup;
  selectedCourse: Course | null = null;
  attendanceDate: string = new Date().toISOString().split('T')[0];
  teacherId: number;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.attendanceForm = this.fb.group({
      courseId: ['', Validators.required],
      date: [this.attendanceDate, Validators.required]
    });

    const teacherUser = JSON.parse(localStorage.getItem('teacherUser') || '{}');
    this.teacherId = teacherUser.id;
  }

  ngOnInit(): void {
    this.loadTeacherCourses();
  }

  loadTeacherCourses(): void {
    this.teacherCourses = this.dataService.getCoursesForTeacher(this.teacherId);
  }

  onCourseSelect(): void {
    const courseId = Number(this.attendanceForm.value.courseId);
    this.selectedCourse = this.teacherCourses.find(c => c.id === courseId) || null;
    
    if (this.selectedCourse) {
      this.loadStudentsForCourse();
      this.loadAttendanceRecords();
    }
  }

  loadStudentsForCourse(): void {
    if (!this.selectedCourse) return;
    
    const students = this.dataService.getStudentsByCourse(this.selectedCourse.id);
    this.students = students.map(student => ({
      ...student,
      status: 'present' as 'present' | 'absent' | 'late'
    }));
  }

  loadAttendanceRecords(): void {
    if (!this.selectedCourse) return;

    const date = this.attendanceForm.value.date;
    const records = this.dataService.getCourseAttendance(this.selectedCourse.id, date);
    
    if (records.length > 0) {
      this.students.forEach(student => {
        const record = records.find(r => r.studentId === student.id);
        if (record) {
          student.status = record.status;
        }
      });
    }
  }

  updateAttendanceStatus(student: StudentWithAttendance, status: 'present' | 'absent' | 'late'): void {
    student.status = status;
  }

  saveAttendance(): void {
    if (!this.selectedCourse) return;

    const date = this.attendanceForm.value.date;
    const records = this.students.map(student => ({
      studentId: student.id,
      date,
      status: student.status,
      courseId: this.selectedCourse!.id
    }));

    this.dataService.saveAttendanceToStorage(
      this.selectedCourse.id,
      date,
      records
    );

    alert('Attendance saved successfully!');
  }
}

interface StudentWithAttendance extends Student {
  status: 'present' | 'absent' | 'late';
}