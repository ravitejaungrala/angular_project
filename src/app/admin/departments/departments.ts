import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments {
   departments: Department[] = [];
  departmentForm: FormGroup;
  isEditing = false;
  currentDepartmentId: number | null = null;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      hod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departments = this.dataService.getDepartments();
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) return;

    const formValue = this.departmentForm.value;
    const department: Department = {
      id: this.currentDepartmentId || this.generateId(),
      name: formValue.name,
      hod: formValue.hod
    };

    if (this.isEditing && this.currentDepartmentId) {
      this.dataService.updateDepartment(department);
    } else {
      this.dataService.addDepartment(department);
    }

    this.resetForm();
    this.loadDepartments();
  }

  onEdit(department: Department): void {
    this.isEditing = true;
    this.currentDepartmentId = department.id;
    
    this.departmentForm.patchValue({
      name: department.name,
      hod: department.hod
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.dataService.deleteDepartment(id);
      this.loadDepartments();
    }
  }

  resetForm(): void {
    this.departmentForm.reset();
    this.isEditing = false;
    this.currentDepartmentId = null;
  }

  private generateId(): number {
    const departments = this.dataService.getDepartments();
    return departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
  }

}
