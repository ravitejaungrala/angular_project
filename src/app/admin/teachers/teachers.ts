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
    this.courses = this.dataService.getCourses().map(course => ({
      id: course.id,
      name: `${course.name} (${course.department})`
    }));
  }

  loadTeachers(): void {
    this.teachers = this.dataService.getTeachers();
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) return;

    const formValue = this.teacherForm.value;
    const teacher: Teacher = {
      id: this.currentTeacherId || this.generateId(),
      name: formValue.name,
      email: formValue.email,
      department: formValue.department,
      courses: formValue.courses
    };

    if (this.isEditing && this.currentTeacherId) {
      this.dataService.updateTeacher(teacher);
    } else {
      this.dataService.addTeacher(teacher);
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