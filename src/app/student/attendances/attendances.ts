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
   attendanceRecords: AttendanceRecord[] = [];
  studentId: number;
  courses: {id: number, name: string}[] = [];
  attendanceSummary: any[] = [];

  constructor(private dataService: Dataservices) {
    const studentUser = JSON.parse(localStorage.getItem('studentUser') || '{}');
    this.studentId = studentUser.id;
  }

  ngOnInit(): void {
    this.loadAttendanceData();
    window.addEventListener('storage', () => this.loadAttendanceData());
  }

  loadAttendanceData(): void {
    // Get fresh data from localStorage
    const storedStudents: Student[] = JSON.parse(localStorage.getItem('studentsData') || '[]');
    const storedCourses: Course[] = JSON.parse(localStorage.getItem('coursesData') || '[]');
    
    const student = storedStudents.find(s => s.id === this.studentId);
    this.attendanceRecords = student?.attendance || [];
    
    // Get unique course IDs from attendance records
    const courseIds = [...new Set(this.attendanceRecords.map(r => r.courseId))];
    
    // Create course list with just id and name
    this.courses = courseIds.map(id => {
      const course = storedCourses.find(c => c.id === id);
      return course ? {id: course.id, name: course.name} : {id: 0, name: 'Unknown Course'};
    });
    
    this.loadAttendanceSummary();
  }

  // Add this method to filter attendance by course
  getAttendanceByCourse(courseId: number): AttendanceRecord[] {
    return this.attendanceRecords.filter(record => record.courseId === courseId);
  }

  loadAttendanceSummary(): void {
    this.attendanceSummary = this.courses.map(course => {
      const courseRecords = this.getAttendanceByCourse(course.id);
      const presentCount = courseRecords.filter(r => r.status === 'present').length;
      const percentage = courseRecords.length > 0 
        ? Math.round((presentCount / courseRecords.length) * 100)
        : 0;
      
      return {
        courseId: course.id,
        courseName: course.name,
        totalClasses: courseRecords.length,
        presentClasses: presentCount,
        percentage: percentage,
        status: percentage >= 75 ? 'Good' : percentage >= 50 ? 'Warning' : 'Danger'
      };
    });
  }
}