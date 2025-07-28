import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendances',
  standalone: false,
  templateUrl: './attendances.html',
  styleUrl: './attendances.css'
})
export class Attendances {
  courses: any[] = [];
  studentsByCourse: {[courseId: number]: any[]} = {};
  attendanceDate: string = new Date().toISOString().split('T')[0];
  teacherId: number;

  constructor(
    private dataService: Dataservices,
    private route: ActivatedRoute
  ) {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadTeacherCourses();
  }

  loadTeacherCourses(): void {
    const teacher = this.dataService.getTeacherById(this.teacherId);
    if (teacher) {
      this.courses = teacher.courses
        .map(courseId => this.dataService.getCourseById(courseId))
        .filter(course => course !== undefined);
      
      this.loadStudentsForCourses();
    }
  }

  loadStudentsForCourses(): void {
    this.studentsByCourse = {};
    this.courses.forEach(course => {
      this.studentsByCourse[course.id] = this.dataService.getStudentsByCourse(course.id)
        .map(student => {
          const attendancePercentage = this.dataService.getAttendancePercentage(
            student.id, 
            course.id
          );
          
          return {
            ...student,
            courseId: course.id,
            attendancePercentage: attendancePercentage || 0,
            attendanceStatus: 'present' // Default status
          };
        });
    });
    this.loadAttendanceRecords();
  }

  onDateChange(): void {
    this.loadAttendanceRecords();
  }

  loadAttendanceRecords(): void {
    this.courses.forEach(course => {
      const records = this.dataService.getCourseAttendance(course.id, this.attendanceDate);
      
      this.studentsByCourse[course.id]?.forEach(student => {
        const existingRecord = records.find(record => record.studentId === student.id);
        student.attendanceStatus = existingRecord?.status || 'present';
      });
    });
  }

  submitAttendance(): void {
    this.courses.forEach(course => {
      const attendanceData = this.studentsByCourse[course.id]?.map(student => ({
        studentId: student.id,
        status: student.attendanceStatus
      })) || [];
      
      this.dataService.markAttendance(
        course.id,
        this.attendanceDate,
        attendanceData
      );
    });
    
    alert('Attendance saved successfully!');
    this.loadStudentsForCourses();
  }
}
