import { Component } from '@angular/core';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-adminhome',
  standalone: false,
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.css'
})
export class Adminhome {

stats = {
    students: 0,
    teachers: 0,
    courses: 0,
    departments: 0
  };
    today: Date = new Date();

  constructor(private dataService: Dataservices) {}

  ngOnInit(): void {
    this.stats.students = this.dataService.getStudents().length;
    this.stats.teachers = this.dataService.getTeachers().length;
    this.stats.courses = this.dataService.getCourses().length;
    this.stats.departments = this.dataService.getDepartments().length;
  }
}
