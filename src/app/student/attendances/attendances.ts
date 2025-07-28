import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendances',
  standalone: false,
  templateUrl: './attendances.html',
  styleUrl: './attendances.css'
})
export class Attendances {

attendanceRecords: any[] = [];
  attendanceSummary: any[] = [];
  studentId: number;

  constructor(
    private dataService: Dataservices,
    private route: ActivatedRoute
  ) {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAttendance();
  }
getCourseName(courseId: number): string {
    const course = this.dataService.getCourseById(courseId);
    return course ? course.name : 'Unknown Course';
  }

  loadAttendance(): void {
    // Load all attendance records for the student
    const student = this.dataService.getStudentById(this.studentId);
    this.attendanceRecords = student?.attendance || [];
    
    // Calculate summary statistics
    const courses = this.dataService.getCourses();
    this.attendanceSummary = courses
      .filter(course => student?.courses.includes(course.id))
      .map(course => {
        const courseAttendance = this.attendanceRecords.filter(
          a => a.courseId === course.id
        );
        
        const presentCount = courseAttendance.filter(
          a => a.status === 'present'
        ).length;
        
        const percentage = courseAttendance.length > 0 
          ? Math.round((presentCount / courseAttendance.length) * 100) 
          : 0;
        
        return {
          courseId: course.id,
          courseName: course.name,
          totalClasses: courseAttendance.length,
          presentClasses: presentCount,
          percentage: percentage
        };
      });
  }
}