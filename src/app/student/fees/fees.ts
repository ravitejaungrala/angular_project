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
    const user = JSON.parse(localStorage.getItem('studentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id);
      this.calculateFeeSummary();
    }
  }
// Add this method to your student fees component (fees.ts)
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
  calculateFeeSummary() {
  if (this.student) {
    // First check the student's fee status directly
    this.totalFee = this.student.fees.totalAmount || this.getDefaultFeeForDepartment(this.student.department);
    
    // Then check payment history
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    const collegePayments = paymentHistory
      .filter((p: any) => p.type === 'college' && p.studentId === this.student.id)
      .reduce((sum: number, p: any) => sum + p.amount, 0);
    
    // Ensure consistency with admin updates
    this.amountPaid = Math.min(collegePayments, this.totalFee);
    this.amountDue = this.totalFee - this.amountPaid;
    
    // Update local student data to match
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