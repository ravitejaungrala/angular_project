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
    // College Fees
   this.totalCollegeFee = this.student.fees.totalAmount || 50000;
    
    const collegePayments = this.paymentHistory
      .filter(p => p.type === 'college' && p.studentId === this.student.id)
      .reduce((sum, p) => sum + p.amount, 0);
    
    this.collegeAmountPaid = collegePayments;
    this.collegeAmountDue = this.totalCollegeFee - collegePayments;
    this.collegeFeePaid = this.collegeAmountDue <= 0;
    // Hostel Fees
    if (this.student.hostel?.allocated) {
      this.isHostelAllocated = true;
      this.totalHostelFee = this.student.hostel.fees.totalAmount || 10000;
      
      const hostelPayments = this.paymentHistory
        .filter(p => p.type === 'hostel')
        .reduce((sum, p) => sum + p.amount, 0);
      
      this.hostelAmountPaid = hostelPayments;
      this.hostelAmountDue = this.totalHostelFee - hostelPayments;
      this.hostelFeePaid = this.hostelAmountDue <= 0;
    } else {
      this.isHostelAllocated = false;
      this.totalHostelFee = 0;
      this.hostelAmountPaid = 0;
      this.hostelAmountDue = 0;
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