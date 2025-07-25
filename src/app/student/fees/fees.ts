import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private dataService: Dataservices) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id);
    }
  }

 payFees() {
    if (this.paymentAmount === null || this.paymentAmount <= 0 || !this.student) return;

    this.lastPaymentAmount = this.paymentAmount;
    
    // Update student fees
    this.student.fees.amount = Math.max(0, this.student.fees.amount - this.paymentAmount);
    this.student.fees.paid = this.student.fees.amount <= 0;
    this.dataService.updateStudent(this.student);
    
    // Record payment
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    paymentHistory.push({
      amount: this.paymentAmount,
      date: new Date().toISOString(),
      studentId: this.student.id
    });
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    
    this.paymentDone = true;
    this.paymentAmount = null;
  }
}