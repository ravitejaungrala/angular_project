import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-fees',
  standalone: false,
  templateUrl: './fees.html',
  styleUrl: './fees.css'
})
export class Fees {
students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  departments: string[] = [];
  selectedDepartment: string = '';
  paymentStatus: string = 'all';

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    this.loadStudents();
    this.departments = this.dataService.getDepartments().map(dept => dept.name);
  }

  loadStudents(): void {
    this.students = this.dataService.getStudents();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          student.id.toString().includes(this.searchTerm);
      const matchesDept = !this.selectedDepartment || student.department === this.selectedDepartment;
      const matchesStatus = this.paymentStatus === 'all' || 
                          (this.paymentStatus === 'paid' && student.fees.paid) ||
                          (this.paymentStatus === 'due' && !student.fees.paid);
      
      return matchesSearch && matchesDept && matchesStatus;
    });
  }

  
updatePaymentStatus(student: Student, status: boolean): void {
  student.fees.paid = status;
  this.dataService.updateStudent(student);
  this.loadStudents();
}
// src/app/admin/fees/fees.component.ts
updateFeeAmount(student: Student, newAmount: number): void {
  if (newAmount >= 0) {
    student.fees.amount = newAmount;
    student.fees.paid = newAmount === 0;
    this.dataService.updateStudent(student);
    this.loadStudents();
  }
}
}