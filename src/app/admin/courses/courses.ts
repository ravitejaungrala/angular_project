import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

  courses: Course[] = [];
  departments: string[] = [];
  years = [1, 2, 3, 4];
  courseForm: FormGroup;
  isEditing = false;
  currentCourseId: number | null = null;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      year: ['', Validators.required],
      credits: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.departments = this.dataService.getDepartments().map(dept => dept.name);
  }

  loadCourses(): void {
    this.courses = this.dataService.getCourses();
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;

    const formValue = this.courseForm.value;
    const course: Course = {
      id: this.currentCourseId || this.generateId(),
      name: formValue.name,
      department: formValue.department,
      year: formValue.year,
      credits: formValue.credits
    };

    if (this.isEditing && this.currentCourseId) {
      this.dataService.updateCourse(course);
    } else {
      this.dataService.addCourse(course);
    }

    this.resetForm();
    this.loadCourses();
  }

  onEdit(course: Course): void {
    this.isEditing = true;
    this.currentCourseId = course.id;
    
    this.courseForm.patchValue({
      name: course.name,
      department: course.department,
      year: course.year,
      credits: course.credits
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.dataService.deleteCourse(id);
      this.loadCourses();
    }
  }

  resetForm(): void {
    this.courseForm.reset();
    this.isEditing = false;
    this.currentCourseId = null;
  }

  private generateId(): number {
    const courses = this.dataService.getCourses();
    return courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  }
}
