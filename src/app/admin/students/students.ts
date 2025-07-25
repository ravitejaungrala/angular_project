import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

 students: Student[] = [];
  departments: string[] = [];
  years = [1, 2, 3, 4];
  studentForm: FormGroup;
  isEditing = false;
  currentStudentId: number | null = null;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      year: ['', Validators.required],
      feesAmount: ['', Validators.required],
      feesPaid: [false],
      hostelRoom: [''],
      hostelBlock: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.departments = this.dataService.getDepartments().map(dept => dept.name);
  }

  loadStudents(): void {
    this.students = this.dataService.getStudents();
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    const formValue = this.studentForm.value;
    const student: Student = {
      id: this.currentStudentId || this.generateId(),
      name: formValue.name,
      email: formValue.email,
      department: formValue.department,
      year: formValue.year,
      courses: [],
      marks: {},
      fees: {
        amount: formValue.feesAmount,
        paid: formValue.feesPaid
      },
      hostel: formValue.hostelRoom ? {
        roomNo: formValue.hostelRoom,
        block: formValue.hostelBlock
      } : undefined
    };

    if (this.isEditing && this.currentStudentId) {
      this.dataService.updateStudent(student);
    } else {
      this.dataService.addStudent(student);
    }

    this.resetForm();
    this.loadStudents();
  }

  onEdit(student: Student): void {
    this.isEditing = true;
    this.currentStudentId = student.id;
    
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      feesAmount: student.fees.amount,
      feesPaid: student.fees.paid,
      hostelRoom: student.hostel?.roomNo || '',
      hostelBlock: student.hostel?.block || ''
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id);
      this.loadStudents();
    }
  }

  resetForm(): void {
    this.studentForm.reset();
    this.isEditing = false;
    this.currentStudentId = null;
  }

  private generateId(): number {
    const students = this.dataService.getStudents();
    return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  }
}