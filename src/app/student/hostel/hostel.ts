import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {
   student: any = null;
  paymentAmount: number | null = null;
  paymentDone: boolean = false;
  lastPaymentAmount: number = 0;
  isLoading: boolean = true;

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    this.loadStudentData();
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

 loadStudentData(): void {
  this.isLoading = true;
  
  // Debug logs start here
  console.log('--- Loading student data ---');
  const user = JSON.parse(localStorage.getItem('studentUser') || '{}');
  console.log('Current user:', user);
  
  const allStudents = this.dataService.getStudents();
  console.log('All students from service:', allStudents);
  
  this.student = allStudents.find((s: any) => s.id === user.id) || null;
  console.log('Found student record:', this.student);
  
  if (!this.student) {
    console.warn('No student found with ID:', user.id);
  } else {
    console.log('Hostel status:', this.student.hostel ? 'Allocated' : 'Not allocated');
    if (this.student.hostel) {
      console.log('Hostel details:', {
        room: this.student.hostel.roomNo,
        block: this.student.hostel.block,
        fees: this.student.hostel.fees
      });
    }
  }
  // Debug logs end here

  this.isLoading = false;
}
  handleStorageChange(event: StorageEvent): void {
    if (event.key === 'studentsData') {
      this.loadStudentData();
    }
  }

  payHostelFees(): void {
    if (!this.paymentAmount || this.paymentAmount <= 0 || !this.student?.hostel) return;

    if (this.paymentAmount > this.student.hostel.fees.amount) {
      alert('Payment amount cannot exceed due amount');
      return;
    }

    this.dataService.payHostelFees(this.student.id, this.paymentAmount);
    
    // Update local state
    this.lastPaymentAmount = this.paymentAmount;
    this.paymentDone = true;
    this.paymentAmount = null;
    
    // Reload data to ensure sync with localStorage
    this.loadStudentData();
  }
}