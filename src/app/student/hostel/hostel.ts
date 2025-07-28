import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {

  student: any;
  paymentAmount: number | null = null;
  paymentDone: boolean = false;
  lastPaymentAmount: number = 0;


 constructor(private dataService: Dataservices) {
    this.loadStudentData();
  }

  loadStudentData() {
    const user = JSON.parse(localStorage.getItem('studentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id);
    }
  }


payHostelFees() {
    if (this.paymentAmount && this.paymentAmount > 0 && this.student?.hostel) {
      // Calculate new remaining amount
      const newRemainingAmount = this.student.hostel.fees.amount - this.paymentAmount;
      
      // Update payment history
      const payment = {
        studentId: this.student.id,
        amount: this.paymentAmount,
        date: new Date().toISOString(),
        type: 'hostel'
      };
      
      const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
      paymentHistory.push(payment);
      localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));

      // Update student's hostel fee status
      this.student.hostel.fees.amount = newRemainingAmount;
      this.student.hostel.fees.paid = newRemainingAmount <= 0;
      
      // Save updated student data
      this.dataService.updateStudent(this.student);
      
      // Update UI
      this.lastPaymentAmount = this.paymentAmount;
      this.paymentDone = true;
      this.paymentAmount = null;
      
      // Refresh data
      this.loadStudentData();
    }
  }
}