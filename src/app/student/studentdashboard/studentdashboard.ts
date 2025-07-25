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
  amountDue: number = 0;
  totalFee:number=50000;
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
      this.calculateFeeSummary();
     const marks = Object.values(this.student.marks) as number[];
      if (marks.length > 0) {
        this.averageMarks = marks.reduce((total: number, current: number) => total + current, 0) / marks.length;
      }
    }
  }
  get lastPayment() {
    return this.paymentHistory[0] || null;
  }
  
  calculateFeeSummary() {
    if (this.student) {
      this.amountPaid = this.totalFee - this.student.fees.amount;
      this.amountDue = this.student.fees.amount;
    }
  }
}