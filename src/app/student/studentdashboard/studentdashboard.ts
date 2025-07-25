import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-studentdashboard',
  standalone: false,
  templateUrl: './studentdashboard.html',
  styleUrl: './studentdashboard.css'
})
export class Studentdashboard {

 student: any;
  averageMarks: number = 0;
   paymentHistory: any[] = [];
 amountPaid: number = 0;
 totalCollegeFee: number = 50000;
  collegeAmountPaid: number = 0;
  collegeAmountDue: number = 0;
  collegeFeePaid: boolean = false;
  amountDue: number = 0;
  totalFee:number=50000;
   hostelFeePaid: boolean = false;
    totalHostelFee: number = 0;
  hostelAmountPaid: number = 0;
  hostelAmountDue: number = 0;
 
  isHostelAllocated: boolean = false;
  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
   const storedUser = localStorage.getItem('currentUser');
const user = storedUser ? JSON.parse(storedUser) : {};

   
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id)!;
      this.paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]')
        .filter((p: any) => p.studentId === this.student.id)
        .reverse();
      
      // Calculate average marks
      const marks = Object.values(this.student.marks) as number[];
      if (marks.length > 0) {
        this.averageMarks = marks.reduce((total: number, current: number) => total + current, 0) / marks.length;
      }

      // Initialize fee status
      this.hostelFeePaid = this.student?.hostel?.fees?.paid || false;
      this.collegeFeePaid = this.student.fees.paid;
      this.calculateFeeSummary();
    }
  }

  
  get lastPayment() {
    return this.paymentHistory[0] || null;
  }
  
  calculateFeeSummary() {
    if (this.student) {
      // College Fees Calculation
      this.collegeFeePaid = this.student.fees.paid;
      this.collegeAmountDue = this.student.fees.amount;
      this.collegeAmountPaid = this.totalCollegeFee - this.collegeAmountDue;

      // Hostel Fees Calculation
      if (this.student.hostel && this.student.hostel.allocated) {
        this.isHostelAllocated = true;
        this.totalHostelFee = this.student.hostel.fees.amount + 
                           (this.student.hostel.fees.paid ? this.student.hostel.fees.amount : 0);
        this.hostelFeePaid = this.student.hostel.fees.paid;
        this.hostelAmountDue = this.student.hostel.fees.paid ? 0 : this.student.hostel.fees.amount;
        this.hostelAmountPaid = this.totalHostelFee - this.hostelAmountDue;
      }
    }
  }
   get collegeFeeStatus() {
    if (!this.student) return 'Loading...';
    return this.collegeFeePaid ? 'Fully Paid' : `Due: ₹${this.collegeAmountDue}`;
  }

  get hostelFeeStatus() {
    if (!this.student?.hostel?.allocated) return 'Not Allocated';
    return this.hostelFeePaid ? 'Fully Paid' : `Due: ₹${this.hostelAmountDue}`;
  }
}