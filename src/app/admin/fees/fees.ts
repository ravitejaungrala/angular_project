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
  const updatedStudent = {
    ...student,
    fees: {
      ...student.fees,
      paid: status,
      // Keep the existing amount unless marking as unpaid
      amount: status ? student.fees.amount : this.getDefaultFeeForDepartment(student.department)
    }
  };

  this.dataService.updateStudent(updatedStudent);
  this.loadStudents(); // Refresh the view
}
 updateFeeAmount(student: Student, newAmount: number): void {
    if (newAmount >= 0) {
      // Create a new object to avoid direct mutation
      const updatedStudent = {
        ...student,
        fees: {
          ...student.fees,
          amount: newAmount,
          paid: newAmount === 0  // Auto-mark as paid if amount is 0
        }
      };

      // Update through the data service
      this.dataService.updateStudent(updatedStudent);
      
      // Refresh the filtered students
      this.applyFilters();
    } else {
      console.warn('Fee amount cannot be negative');
    }
  }
private getDefaultFeeForDepartment(dept: string): number {
  const feesMap: Record<string, number> = {
    'CSE': 50000,
    'AIML': 55000,
    'IT': 52000,
    'ECE': 48000,
    'EEE': 45000,
    'MECH': 40000,
    'CIVIL': 38000
  };
  return feesMap[dept] || 50000;
}
}