import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-fees',
  standalone: false,
  templateUrl: './fees.html',
  styleUrl: './fees.css'
})
export class Fees {
  student: any;
  paymentAmount: number | null = null;
  paymentDone: boolean = false;
  totalFee: number = 50000;
  lastPaymentAmount: number = 0;
  amountDue: number = 0;
  amountPaid: number = 0;

  constructor(private dataService: Dataservices) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id);
      this.calculateFeeSummary();
    }
  }

  calculateFeeSummary() {
    if (this.student) {
      // Initialize fee amounts
      this.totalFee = this.student.fees.totalAmount || 50000;
      
      // Get all college payments for this student
      const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
      const collegePayments = paymentHistory
        .filter((p: any) => p.type === 'college' && p.studentId === this.student.id)
        .reduce((sum: number, p: any) => sum + p.amount, 0);
      
      // Update amounts
      this.amountPaid = collegePayments;
      this.amountDue = this.totalFee - collegePayments;
      
      // Update student status
      this.student.fees.amount = this.amountDue;
      this.student.fees.paid = this.amountDue <= 0;
    }
  }

  payFees() {
    if (!this.paymentAmount || this.paymentAmount <= 0 || !this.student) {
      return;
    }

    // Record payment
    const payment = {
      studentId: this.student.id,
      amount: this.paymentAmount,
      date: new Date().toISOString(),
      type: 'college'  // Important: Mark as college payment
    };

    // Update payment history
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    paymentHistory.push(payment);
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));

    // Update student data
    this.student.fees.amount = Math.max(0, this.student.fees.amount - this.paymentAmount);
    this.student.fees.paid = this.student.fees.amount <= 0;
    this.dataService.updateStudent(this.student);

    // Update UI
    this.lastPaymentAmount = this.paymentAmount;
    this.paymentDone = true;
    this.paymentAmount = null;
    
    // Recalculate fee summary
    this.calculateFeeSummary();
  }
}