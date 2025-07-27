import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-marks',
  standalone: false,
  templateUrl: './marks.html',
  styleUrl: './marks.css'
})
export class Marks {
  
  courses: Course[] = [];
  selectedCourseId: number | null = null;

  marksForm: FormGroup;
  showStudentMarks = false;
  
 teacher: Teacher | undefined;

  students: {student: Student, courses: Course[]}[] = [];
  editMode: {[key: string]: boolean} = {};

constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.marksForm = this.fb.group({});
  }

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return;

    const user = JSON.parse(userJson);
    if (user?.role === 'teacher' && user?.id) {
      this.teacher = this.dataService.getTeacherById(user.id);
      if (this.teacher) {
        this.loadTeacherData();
      }
    }
  }

  loadTeacherData(): void {
    if (!this.teacher) return;
    
    this.courses = this.dataService.getTeacherCourses(this.teacher.id);
    
    // Get unique students from all courses
    const allStudents: Student[] = [];
    this.teacher.courses.forEach(courseId => {
      const courseStudents = this.dataService.getStudentsByCourse(courseId);
      allStudents.push(...courseStudents);
    });

    // Remove duplicates and prepare student data
    this.students = Array.from(new Set(allStudents.map(s => s.id)))
      .map(id => {
        const student = allStudents.find(s => s.id === id)!;
        const courses = this.getTeacherCoursesForStudent(student);
        return { student, courses };
      });

    // Initialize edit mode
    this.students.forEach(studentData => {
      studentData.courses.forEach(course => {
        const key = this.getFormKey(studentData.student.id, course.id);
        this.editMode[key] = false;
        this.marksForm.addControl(
          key,
          this.fb.control(
            studentData.student.marks?.[course.id] || 0,
            [Validators.required, Validators.min(0), Validators.max(100)]
          )
        );
      });
    });
  }

  toggleEdit(studentId: number, courseId: number): void {
    const key = this.getFormKey(studentId, courseId);
    this.editMode[key] = !this.editMode[key];
  }

  saveMark(studentId: number, courseId: number): void {
    const key = this.getFormKey(studentId, courseId);
    if (this.marksForm.get(key)?.invalid) return;

    const mark = this.marksForm.get(key)?.value;
    this.dataService.updateStudentMarks(studentId, courseId, mark);
    this.editMode[key] = false;
    alert('Mark updated successfully!');
  }

  getFormKey(studentId: number, courseId: number): string {
    return `student_${studentId}_course_${courseId}`;
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

  getTeacherCoursesForStudent(student: Student): Course[] {
    if (!this.teacher) return [];
    
    return student.courses
      .filter(courseId => this.teacher?.courses.includes(courseId))
      .map(courseId => this.dataService.getCourseById(courseId))
      .filter(course => course !== undefined) as Course[];
  }
getStudentMark(student: Student, courseId: number): number | undefined {
  return student.marks?.[courseId];
}

}