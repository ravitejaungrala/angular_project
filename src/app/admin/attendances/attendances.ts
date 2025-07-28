import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selectedCourse: any;
  attendanceForm: FormGroup;
  attendanceDate: string = new Date().toISOString().split('T')[0];
  attendanceRecords: any[] = [];

  constructor(private dataService: Dataservices, private fb: FormBuilder) {
    this.attendanceForm = this.fb.group({
      courseId: [''],
      date: [this.attendanceDate]
    });
  }

  ngOnInit(): void {
    this.courses = this.dataService.getCourses();
  }

  loadStudents(): void {
    this.students = this.dataService.getStudentsByCourse(this.selectedCourse.id)
      .map(student => {
        // Initialize each student with default attendance status
        return {
          ...student,
          attendancePercentage: this.dataService.getAttendancePercentage(student.id, this.selectedCourse.id),
          attendanceStatus: 'present' // Default status for new records
        };
      });
  }

  loadAttendanceRecords(): void {
     if (this.selectedCourse && this.attendanceDate) {
      this.attendanceRecords = this.dataService.getCourseAttendance(this.selectedCourse.id, this.attendanceDate);
      
      // Update student statuses based on existing records
      this.students.forEach(student => {
        const existingRecord = this.attendanceRecords.find(record => 
          record.studentId === student.id
        );
        if (existingRecord) {
          student.attendanceStatus = existingRecord.status;
        } else {
          student.attendanceStatus = 'present'; // Default for new records
        }
      });
    }
  }

  onCourseChange(): void {
   if (this.selectedCourse) {
      this.loadStudents();
      this.loadAttendanceRecords();
    }
  }

  onDateChange(): void {
    if (this.selectedCourse) {
      this.loadAttendanceRecords();
    }
  }

   submitAttendance(): void {
  if (!this.selectedCourse) {
    alert('Please select a course first');
    return;
  }

  const attendanceData = this.students
    .filter(student => student.id)
    .map(student => ({
      studentId: student.id,
      status: student.attendanceStatus
    }));
  
  this.dataService.markAttendance(
    this.selectedCourse.id,
    this.attendanceDate,
    attendanceData
  );
  
  alert('Attendance saved successfully!');
  
  // Refresh the data to show updated percentages
  this.loadStudents();
  this.loadAttendanceRecords();
  
  // Recalculate percentages for all students
  this.students = this.students.map(student => {
    return {
      ...student,
      attendancePercentage: this.dataService.getAttendancePercentage(student.id, this.selectedCourse.id)
    };
  });
}
}