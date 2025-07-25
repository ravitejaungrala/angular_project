import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  blocks: string[] = ['A', 'B', 'C', 'D'];
  selectedBlock: string = '';
  allocationForm: FormGroup;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.allocationForm = this.fb.group({
      studentId: [''],
      roomNo: [''],
      block: ['']
    });
    
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.dataService.getStudents();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          student.id.toString().includes(this.searchTerm);
      const matchesBlock = !this.selectedBlock || 
                          (student.hostel && student.hostel.block === this.selectedBlock);
      
      return matchesSearch && matchesBlock;
    });
  }

  onAllocate(): void {
    const formValue = this.allocationForm.value;
    const student = this.dataService.getStudentById(formValue.studentId);
    
    if (student) {
      student.hostel = {
        roomNo: formValue.roomNo,
        block: formValue.block
      };
      this.dataService.updateStudent(student);
      this.loadStudents();
      this.allocationForm.reset();
    }
  }

  onDeallocate(student: Student): void {
    if (confirm('Are you sure you want to deallocate this student from hostel?')) {
      student.hostel = undefined;
      this.dataService.updateStudent(student);
      this.loadStudents();
    }
  }
 
}

