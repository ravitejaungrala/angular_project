import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {

 student!: Student;
  hasHostel: boolean = false;

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role === 'student' && user.id) {
      this.student = this.dataService.getStudentById(user.id)!;
      this.hasHostel = !!this.student.hostel;
    }
  }
}