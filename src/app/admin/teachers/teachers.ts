import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.html',
  styleUrl: './teachers.css'
})
export class Teachers {

teachers: Teacher[] = [];
  departments: string[] = [];
  courses: any[] = [];
  teacherForm: FormGroup;
  isEditing = false;
  currentTeacherId: number | null = null;
teacherCourses: { course: Course, students: Student[] }[] = [];
  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      courses: [[]]
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.departments = this.dataService.getDepartments().map(dept => dept.name);
    this.courses = this.dataService.getCourses();
    this.loadTeacherCourses();
  }

  loadTeachers(): void {
    this.teachers = this.dataService.getTeachers();
  }
// teachers.component.ts
loadTeacherCourses(): void {
  const storedUser = localStorage.getItem('teacherUser');
  const user: User = storedUser ? JSON.parse(storedUser) : {};
  
  if (user.role === 'teacher' && user.id) {
    const teacher = this.dataService.getTeacherById(user.id);
    if (teacher) {
      this.teacherCourses = teacher.courses
        .map(courseId => {
          const course = this.dataService.getCourseById(courseId);
          if (!course) return null;
          const students = this.dataService.getStudentsByCourse(courseId);
          return { course, students };
        })
        .filter(item => item !== null) as { course: Course; students: Student[] }[];
    }
  }
}

  onSubmit(): void {
  if (this.teacherForm.invalid) return;

  const formValue = this.teacherForm.value;
  const teacher: Teacher = {
    id: this.currentTeacherId || this.generateId(),
    name: formValue.name,
    email: formValue.email,
    department: formValue.department,
    courses: formValue.courses || []
  };

  if (this.isEditing && this.currentTeacherId) {
    this.dataService.updateTeacher(teacher);
  } else {
    this.dataService.addTeacher(teacher);
    
    // Fixed this line:
    const teachersData = JSON.parse(localStorage.getItem('teachersData') || '[]');
    teachersData.push({
      id: teacher.id,
      email: teacher.email,
      password: 't12345'
    });
    localStorage.setItem('teachersData', JSON.stringify(teachersData));
  }

  this.resetForm();
  this.loadTeachers();
}

  onEdit(teacher: Teacher): void {
    this.isEditing = true;
    this.currentTeacherId = teacher.id;
    
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
      courses: teacher.courses
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.dataService.deleteTeacher(id);
      this.loadTeachers();
    }
  }

  resetForm(): void {
    this.teacherForm.reset();
    this.isEditing = false;
    this.currentTeacherId = null;
  }

  private generateId(): number {
    const teachers = this.dataService.getTeachers();
    return teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
  }
}