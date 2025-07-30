import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-attendances',
  standalone: false,
  templateUrl: './attendances.html',
  styleUrl: './attendances.css'
})
export class Attendances {
  courses: any[] = [];
  students: any[] = [];
  attendanceForm: FormGroup;
  selectedCourse: any;
  attendanceDate: string = new Date().toISOString().split('T')[0];
  attendanceRecords: any[] = [];
  attendanceSummary: any;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.attendanceForm = this.fb.group({
      courseId: ['', Validators.required],
      date: [this.attendanceDate, Validators.required]
    });
  }
private storageSub: any;
  ngOnInit(): void {
    this.loadCourses();
    this.storageSub = window.addEventListener('storage', (event) => {
    if (event.key === 'attendanceUpdated') {
      this.loadAttendanceRecords(); // Refresh data when updated
    }
  });
  }

  loadCourses(): void {
    this.courses = this.dataService.getCourses();
  }
ngOnDestroy(): void {
  // Clean up listener
  window.removeEventListener('storage', this.storageSub);
}
onCourseSelect(): void {
  const courseId = Number(this.attendanceForm.value.courseId); // Ensure it's a number
  this.selectedCourse = this.dataService.getCourseById(courseId);
  
  if (!this.selectedCourse) {
    console.error('Course not found for ID:', courseId);
    console.log('Available courses:', this.dataService.getCourses());
    return;
  }

  this.loadStudentsForCourse();
  this.loadAttendanceRecords();
}
  loadStudentsForCourse(): void {
  if (!this.selectedCourse) return;
  
  this.students = this.dataService.getStudentsByCourse(this.selectedCourse.id).map(student => {
    return {
      ...student,
      status: 'present' // default status
    };
  });
}
  loadAttendanceRecords(): void {
    const records = this.dataService.getCourseAttendance(
      this.selectedCourse.id, 
      this.attendanceForm.value.date
    );
    
    this.attendanceRecords = records;
    
    // Update student statuses if records exist
    if (records.length > 0) {
      this.students.forEach(student => {
        const record = records.find(r => r.studentId === student.id);
        if (record) {
          student.status = record.status;
        }
      });
    }
  }

  markAttendance(): void {
    const attendanceData = this.students.map(student => ({
      studentId: student.id,
      status: student.status
    }));

    this.dataService.markAttendance(
      this.selectedCourse.id,
      this.attendanceForm.value.date,
      attendanceData
    );

    this.loadAttendanceRecords();
    this.calculateAttendanceSummary();
  }

  calculateAttendanceSummary(): void {
    const presentCount = this.attendanceRecords.filter(r => r.status === 'present').length;
    const absentCount = this.attendanceRecords.filter(r => r.status === 'absent').length;
    const lateCount = this.attendanceRecords.filter(r => r.status === 'late').length;
    const total = this.attendanceRecords.length;

    this.attendanceSummary = {
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      total: total,
      presentPercentage: total > 0 ? Math.round((presentCount / total) * 100) : 0
    };
  }

  updateAttendanceStatus(student: any, status: 'present' | 'absent' | 'late'): void {
    student.status = status;
  }
}