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
       hostelAllocated: [false],
      hostelRoom: [''],
      hostelBlock: [''],
      hostelFeesAmount: [''],
      hostelFeesPaid: [false] 
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
        amount: formValue.collegeFeesAmount,
        paid: formValue.collegeFeesPaid
      },
      hostel: formValue.hostelAllocated ? {
        allocated: true,
        roomNo: formValue.hostelRoom || undefined,
        block: formValue.hostelBlock || undefined,
        fees: {
          amount: formValue.hostelFeesAmount || 0,
          paid: formValue.hostelFeesPaid
        }
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
      collegeFeesAmount: student.fees.amount,
      collegeFeesPaid: student.fees.paid,
      hostelAllocated: student.hostel?.allocated || false,
      hostelRoom: student.hostel?.roomNo || '',
      hostelBlock: student.hostel?.block || '',
      hostelFeesAmount: student.hostel?.fees.amount || '',
      hostelFeesPaid: student.hostel?.fees.paid || false
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

  onHostelAllocationChange(allocated: boolean): void {
    if (allocated) {
      this.studentForm.get('hostelRoom')?.setValidators([Validators.required]);
      this.studentForm.get('hostelBlock')?.setValidators([Validators.required]);
      this.studentForm.get('hostelFeesAmount')?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.studentForm.get('hostelRoom')?.clearValidators();
      this.studentForm.get('hostelBlock')?.clearValidators();
      this.studentForm.get('hostelFeesAmount')?.clearValidators();
    }
    this.studentForm.get('hostelRoom')?.updateValueAndValidity();
    this.studentForm.get('hostelBlock')?.updateValueAndValidity();
    this.studentForm.get('hostelFeesAmount')?.updateValueAndValidity();
  }
}