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
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id);
    }
  }

  payHostelFees() {
    if (this.paymentAmount && this.paymentAmount > 0 && this.student?.hostel) {
      this.lastPaymentAmount = this.paymentAmount;
      this.dataService.payHostelFees(this.student.id, this.paymentAmount);
      this.paymentDone = true;
      this.paymentAmount = null;
    }
  }
}